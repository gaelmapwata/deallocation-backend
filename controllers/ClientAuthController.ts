/* eslint-disable no-param-reassign */
import { Response } from 'express';
import { checkSchema } from 'express-validator';
import ClientValidator from '../validators/ClientValidator';
import { Request } from '../types/ExpressOverride';
import { handleExpressValidators } from '../utils/ExpressUtil';
import Client from '../models/PartnerDetail';
import BlacklistToken from '../models/BlacklistToken';
import LogHelper from '../utils/logHelper';
import { TokenTypeE } from '../types/Token';
import ClientAuthService from '../services/ClientAuthService';
import BcryptUtil from '../utils/BcryptUtil';
import ClientNotFoundError from '../types/error/ClientNotFoundError';
import ClientAuthInvalidPasswordError from '../types/error/ClientAuthInvalidPasswordError';
import ClientLockedError from '../types/error/ClientLockedError';

const jwt = require('jsonwebtoken');

// const JWT_TIME_VALIDITY = 60 * 5; // 5min
const TOKEN_EXPIRATION_TIME_IN_SECONDS = 5 * 60;
// const MAX_LOGIN_ATTEMPT = 3;

// async function onLoginFailed(client:Client) {
//   // eslint-disable-next-line no-param-reassign
//   client.totalLoginAttempt += 1;
//   await client.save();

//   if (client.totalLoginAttempt === MAX_LOGIN_ATTEMPT) {
//     // eslint-disable-next-line no-param-reassign
//     client.locked = true;
//     await client.save();
//   }
// }

// async function onLoginSuccess(client:Client) {
//   // eslint-disable-next-line no-param-reassign
//   client.totalLoginAttempt = 0;
//   await client.save();
// }

export default {
  signin: [
    checkSchema(ClientValidator.signinSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const clientToLogin = await ClientAuthService.checkUserPasswordValidity({
          email: req.body.email,
          password: req.body.password,
        });

        const token = jwt.sign({
          id: clientToLogin.id,
          type: TokenTypeE.CLIENT_TOKEN,
        }, process.env.JWT_SECRET, {
          expiresIn: TOKEN_EXPIRATION_TIME_IN_SECONDS,
        });
        LogHelper.info(`ClientAuth | user ${req.body.email} successful logged`);
        return res.status(200).json({
          client: clientToLogin,
          token,
        });
      } catch (error) {
        if (
          error instanceof ClientNotFoundError
          || error instanceof ClientAuthInvalidPasswordError
        ) {
          return res.status(401).json({ message: 'Identifiants invalides' });
        } if (error instanceof ClientLockedError) {
          return res.status(423).json({ message: error.message });
        }

        return res.status(500).json(error);
      }
    },
  ],
  getCurrentClient: async (req: Request, res: Response) => {
    try {
      const loggedClient = await Client.findByPk(req.userId as number);
      if (!loggedClient) {
        return res.status(401).send({ message: "Ce compte n'a pas été retrouvé" });
      }

      return res.status(200).json(loggedClient);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      const token = ClientAuthService.getLoggedToken({ req });
      const blacklistToken = await BlacklistToken.create({ token, type: TokenTypeE.CLIENT_TOKEN });
      return res.status(201).json(blacklistToken);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  changePassword: [
    checkSchema(ClientValidator.changePasswordSchema),
    async (req: Request, res: Response) => {
      try {
        if (handleExpressValidators(req, res)) {
          return null;
        }

        const user = await ClientAuthService.checkUserPasswordValidity({
          email: req.user?.email,
          password: req.body.oldPassword,
        });

        const hashedPassword = await BcryptUtil.hashPassword(req.body.newPassword);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json(user);
      } catch (error) {
        if (error instanceof ClientNotFoundError) {
          return res.status(401).json({ message: error.message });
        }

        if (error instanceof ClientAuthInvalidPasswordError) {
          return res.status(422).json({ message: error.message });
        }
        return res.status(500).json(error);
      }
    },
  ],
};
