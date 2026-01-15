/* eslint-disable no-param-reassign */
import { Response } from 'express';
import { Op } from 'sequelize';
import { Request } from '../types/ExpressOverride';

import User from '../models/User';
import Otp from '../models/Otp';
import Role from '../models/Role';
import Permission from '../models/Permission';
import Branch from '../models/Branch';
import Bank from '../models/Bank';
import BlacklistToken from '../models/BlacklistToken';

import AuthPasswordService from '../services/auth/AuthPasswordService';
import UserService from '../services/UserService';
import errorHandlerService from '../services/ErrorHandlerService';
import LogHelper from '../utils/logHelper';
// import EntrustService from '../services/entrustService';
import { TokenTypeE } from '../types/Token';

const jwt = require('jsonwebtoken');

const JWT_TIME_VALIDITY = 60 * 55;
const JWT_PASSWORD_TOKEN_TIME_VALIDITY = 5 * 60;
const MAX_LOGIN_ATTEMPT = 3;

/* =======================
   Helpers
======================= */

async function onLoginFailed(user: User) {
  user.totalLoginAttempt += 1;
  await user.save();

  if (user.totalLoginAttempt === MAX_LOGIN_ATTEMPT) {
    user.locked = true;
    await user.save();
  }
}

async function onLoginSuccess(user: User) {
  user.totalLoginAttempt = 0;
  await user.save();
}

/* =======================
   Controller
======================= */

export default {
  signin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        include: [{ model: Branch, include: [Bank] }],
      });

      if (!user) {
        return res.status(401).json({
          msg: 'This account has not been found, please contact the administrator',
        });
      }

      if (user.locked) {
        return res.status(401).json({
          msg: 'This account has been blocked, please contact the administrator',
        });
      }

      if (!user.branch || !user.branch.bank) {
        return res.status(401).json({
          msg: 'This account is not correctly linked to a branch/bank',
        });
      }

      const userIsAdmin = await UserService.userIsAdmin(user.id);
      if (userIsAdmin && !user.validatedByUserId) {
        return res.status(401).json({
          msg: 'This account has not been yet validated, please contact the administrator',
        });
      }

      LogHelper.info(`Auth | user ${email} trying to login`, '');

      // 🔥 ICI : toute la logique AD / bcrypt est déléguée
      try {
        await AuthPasswordService.validatePassword(user, password);
      } catch (error) {
        await onLoginFailed(user);
        return res.status(401).json({
          msg: `Invalid Email or Password. Remaining attempts (${MAX_LOGIN_ATTEMPT - user.totalLoginAttempt})`,
        });
      }

      // Nettoyage OTP expirés
      await Otp.destroy({
        where: {
          email,
          expirationDate: {
            [Op.lt]: new Date(),
          },
        },
      });

      const token = jwt.sign(
        {
          id: user.id,
          type: TokenTypeE.MAIN_TOKEN,
        },
        process.env.JWT_SECRET,
        { expiresIn: JWT_PASSWORD_TOKEN_TIME_VALIDITY },
      );

      await onLoginSuccess(user);

      LogHelper.info(`Auth | user ${email} successfully logged`, '');

      return res.status(200).json({
        msg: 'successful authentication',
        token,
      });
    } catch (error) {
      return errorHandlerService.handleResponseError(res, error as Error);
    }
  },

  checkOtp: async (req: Request, res: Response) => {
    try {
      const user = req.passwordAuthData?.user as User;

      // const otpValid = await EntrustService.sendEntrustToken(
      //   user.email,
      //   req.body.otp,
      // );

      // if (!otpValid) {
      //   return res.status(401).json({ msg: 'Otp not recognized or expired' });
      // }

      const token = jwt.sign(
        { id: user.id, type: TokenTypeE.MAIN_TOKEN },
        process.env.JWT_SECRET,
        { expiresIn: JWT_TIME_VALIDITY },
      );

      await BlacklistToken.create({
        token: req.body.token,
        type: TokenTypeE.MAIN_TOKEN,
      });

      LogHelper.info(`Auth | user ${user.email} successful logged with OTP`, '');

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getCurrentUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk((req as any).userId, {
        include: [{ model: Role, include: [Permission] }],
      });

      if (!user) {
        return res.status(401).json({ msg: 'This account has not been found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader?.split(' ')[0];
      if (bearer !== 'Bearer') {
        return res.sendStatus(401);
      }

      const token = authHeader?.split(' ')[1];
      const blacklistToken = await BlacklistToken.create({
        token,
        type: TokenTypeE.MAIN_TOKEN,
      });

      return res.status(201).json(blacklistToken);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
