import { Response, NextFunction } from 'express';
import { Request } from '../types/ExpressOverride';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import AuthInvalidTokenError from '../types/error/AuthInvalidTokenError';
import AuthNoTokenProvidedError from '../types/error/AuthNoTokenProvidedError';
import AuthTokenBlacklistedError from '../types/error/AuthTokenBlacklistedError';
import AuthUserLockedError from '../types/error/AuthUserLockedError';
import AuthUserNotFoundError from '../types/error/AuthUserNotFoundError';

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

  // eslint-disable-next-line max-len
  shouldHavePermission: (permission: string) => async (req: Request, res: Response, next: NextFunction) => {
    const passed = await UserService.userByIdHasPermission(req.userId as number, permission);
    if (passed) {
      return next();
    }
    return res.status(403).json({ message: "Vous n'avez pas les accès nécessaires" });
  },

  // eslint-disable-next-line max-len
  shouldHavePermissionOrParamIdBeLoggedUserId: (permission: string) => async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId || req.userId !== +req.params.id) {
      const passed = await UserService.userByIdHasPermission(req.userId as number, permission);
      if (passed) {
        return next();
      }
      return res.status(403).json({ message: "Vous n'avez pas les accès nécessaires" });
    }
    return next();
  },
};
