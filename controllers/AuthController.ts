import { Response } from 'express';
import { checkSchema } from 'express-validator';
import AuthValidators from '../validators/AuthValidator';
import { Request } from '../types/xpressOverride';
import { handleExpressValidators } from '../utils/ExpressUtil';
import User from '../models/User';
import Role from '../models/Role';
import Permission from '../models/Permission';
import BlacklistToken from '../models/BlacklistToken';
import { TokenTypeE } from '../types/Token';
import AuthService from '../services/AuthService';
import BcryptUtil from '../utils/BcryptUtil';
import InvalidPasswordError from '../types/error/InvalidPasswordError';
import UserNotFoundError from '../types/error/UserNotFoundError';
import UserLockedError from '../types/error/UserLockedError';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

const TOKEN_EXPIRATION_TIME_IN_SECONDS = 24 * 60 * 60; // 1 day

export default {
  signin: [
    checkSchema(AuthValidators.signinSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const userToLogin = await AuthService.checkUserPasswordValidity({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        });

        const token = jwt.sign({
          id: userToLogin.id,
          type: TokenTypeE.LOGIN_TOKEN,
        }, process.env.JWT_SECRET, {
          expiresIn: TOKEN_EXPIRATION_TIME_IN_SECONDS,
        });
        return res.status(200).json({
          user: userToLogin,
          token,
        });
      } catch (error) {
        if (
          error instanceof UserNotFoundError
          || error instanceof InvalidPasswordError
        ) {
          return res.status(401).json({ message: 'Identifiants invalides' });
        } if (error instanceof UserLockedError) {
          return res.status(423).json({ message: error.message });
        }

        return res.status(500).json(error);
      }
    },
  ],
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      const loggedUser = await User.findByPk(req.userId as number, {
        include: [{ model: Role, include: [Permission] }],
      });
      if (!loggedUser) {
        return res.status(401).send({ message: "Ce compte n'a pas été retrouvé" });
      }

      return res.status(200).json(loggedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const token = AuthService.getLoggedToken(req);
      const blacklistToken = await BlacklistToken.create({ token, type: TokenTypeE.LOGIN_TOKEN });
      return res.status(201).json(blacklistToken);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  changePassword: [
    checkSchema(AuthValidators.changePasswordSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const user = await AuthService.checkUserPasswordValidity({
          email: req.user?.email,
          username: req.user?.username,
          password: req.body.oldPassword,
        });

        const hashedPassword = await BcryptUtil.hashPassword(req.body.newPassword);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json(user);
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          return res.status(401).json({ message: error.message });
        }

        if (error instanceof InvalidPasswordError) {
          return res.status(422).json({ message: error.message });
        }
        return res.status(500).json(error);
      }
    },
  ],
};
