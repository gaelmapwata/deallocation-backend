import { Response, NextFunction } from 'express';
import { Request } from '../types/ExpressOverride';
import ClientAuthService from '../services/ClientAuthService';
import ClientAuthInvalidTokenError from '../types/error/ClientAuthInvalidTokenError';
import ClientAuthNoTokenProvidedError from '../types/error/ClientAuthNoTokenProvidedError';
import ClientAuthTokenBlacklistedError from '../types/error/ClientAuthTokenBlacklistedError';
import ClientLockedError from '../types/error/ClientLockedError';
import ClientNotFoundError from '../types/error/ClientNotFoundError';

export default {
  shouldBeLogged: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await ClientAuthService.checkUserLoggedFromRequestToken({ req });
      req.clientId = client.id;
      req.client = client;
      return next();
    } catch (error) {
      if (error instanceof ClientAuthInvalidTokenError
        || error instanceof ClientNotFoundError
        || error instanceof ClientLockedError
      ) {
        return res.status(401).json({ message: error.message });
      }

      if (error instanceof ClientAuthNoTokenProvidedError) {
        return res.status(403).json({ message: error.message });
      }

      if (error instanceof ClientAuthTokenBlacklistedError) {
        return res.status(409).json({ message: error.message });
      }

      return res.status(500).json(error);
    }
  },

  shouldParamIdBeLoggedUserId(req: Request, res: Response, next: NextFunction) {
    if (!req.clientId || req.clientId !== +req.params.id) {
      return res.status(403).json({
        message: 'Vous n\'êtes pas authorisé à effectuer cette action !',
      });
    }
    return next();
  },
};
