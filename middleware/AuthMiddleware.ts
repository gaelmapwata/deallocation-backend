import { Response, NextFunction } from 'express';
import { Request } from '../types/ExpressOverride';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import AuthInvalidTokenError from '../types/error/AuthInvalidTokenError';
import AuthNoTokenProvidedError from '../types/error/AuthNoTokenProvidedError';
import AuthTokenBlacklistedError from '../types/error/AuthTokenBlacklistedError';
import AuthUserLockedError from '../types/error/AuthUserLockedError';
import AuthUserNotFoundError from '../types/error/AuthUserNotFoundError';
import BlacklistToken from '../models/BlacklistToken';
import User from '../models/User';
import { TokenDecodedI, TokenTypeE } from '../types/Token';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

export default {
  shouldBeLogged: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.checkUserLoggedFromRequestToken({ req });
      req.userId = user.id;
      req.user = user;
      return next();
    } catch (error) {
      if (error instanceof AuthInvalidTokenError
        || error instanceof AuthUserNotFoundError
        || error instanceof AuthUserLockedError
      ) {
        return res.status(401).json({ message: error.message });
      }

      if (error instanceof AuthNoTokenProvidedError) {
        return res.status(403).json({ message: error.message });
      }

      if (error instanceof AuthTokenBlacklistedError) {
        return res.status(409).json({ message: error.message });
      }

      return res.status(500).json(error);
    }
  },

  shouldParamIdBeLoggedUserId(req: Request, res: Response, next: NextFunction) {
    if (!req.userId || req.userId !== +req.params.id) {
      return res.status(403).json({
        message: 'Vous n\'êtes pas authorisé à effectuer cette action !',
      });
    }
    return next();
  },

  verifyPasswordToken: async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!token) {
      return res.status(403).json({
        message: 'No tokens provided!',
      });
    }

    const blacklistToken = await BlacklistToken.findOne({
      where: {
        token,
        type: TokenTypeE.MAIN_TOKEN,
      },
    });

    if (blacklistToken) {
      return res.status(409).json({
        msg: 'Session expired please re-authenticate with your password',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: null, decoded: TokenDecodedI) => {
      if (err) {
        return res.status(401).json({
          msg: 'Session expired please re-authenticate with your password',
        });
      }

      if (!decoded.type || decoded.type !== TokenTypeE.MAIN_TOKEN) {
        return res.status(409).json({
          msg: 'Invalid token',
        });
      }

      User
        .findByPk(decoded.id)
        .then((user) => {
          if (user) {
            req.passwordAuthData = {
              userId: decoded.id,
              user,
            };
            next();
          } else {
            return res.status(401).json({
              msg: 'This account has not been found',
            });
          }
        });
    });
  },

  // eslint-disable-next-line max-len
  shouldHaveOneOfPermissions: (...permissions: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const passed = await UserService
      .userByIdHasOneOfPermissions(req.userId as number, ...permissions);
    if (passed) {
      return next();
    }
    return res.status(403).json({ message: "Vous n'avez pas les accès nécessaires" });
  },

  // eslint-disable-next-line max-len
  shouldHaveOneOfPermissionsOrParamIdBeLoggedUserId: (...permissions: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId || req.userId !== +req.params.id) {
      const passed = await UserService
        .userByIdHasOneOfPermissions(req.userId as number, ...permissions);
      if (passed) {
        return next();
      }
      return res.status(403).json({ message: "Vous n'avez pas les accès nécessaires" });
    }
    return next();
  },
};
