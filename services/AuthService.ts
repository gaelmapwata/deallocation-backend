import { Op } from 'sequelize';
import User from '../models/User';
import { Request } from '../types/ExpressOverride';
import UserLockedError from '../types/error/UserLockedError';
import UserNotFoundError from '../types/error/UserNotFoundError';
import AuthInvalidTokenError from '../types/error/AuthInvalidTokenError';
import AuthNoTokenProvidedError from '../types/error/AuthNoTokenProvidedError';
import Permission from '../models/Permission';
import Role from '../models/Role';
import { TokenDecodedI, TokenTypeE } from '../types/Token';
import AuthTokenBlacklistedError from '../types/error/AuthTokenBlacklistedError';
import AuthUserLockedError from '../types/error/AuthUserLockedError';
import AuthUserNotFoundError from '../types/error/AuthUserNotFoundError';
import BlacklistTokenService from './BlacklistTokenService';
import AuthPasswordService from './auth/AuthPasswordService';
import Branch from '../models/Branch';
import Bank from '../models/Bank';

// eslint-disable-next-line
const jwt = require('jsonwebtoken');

const AuthService = {
  getAuthorizationHeader(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    return authHeader;
  },

  getLoggedTokenPrefix(payload: {req: Request} | { token: string}): string | undefined {
    let authHeader: string;
    if ('req' in payload) {
      authHeader = AuthService.getAuthorizationHeader(payload.req) as string;
    } else {
      authHeader = payload.token;
    }
    return authHeader ? authHeader.split(' ')[0] as string : undefined;
  },

  getLoggedToken(payload: {req: Request} | { token: string}): string | undefined {
    let authHeader: string;
    if ('req' in payload) {
      authHeader = AuthService.getAuthorizationHeader(payload.req) as string;
    } else {
      authHeader = payload.token;
    }
    return authHeader ? authHeader.split(' ')[1] as string : undefined;
  },

  async checkUserPasswordValidity(payload: {
  email?: string,
  username?: string,
  password: string,
}): Promise<User> {
    if (!payload.email && !payload.username) {
      throw new UserNotFoundError('Email ou username requis');
    }

    const filterQuery: Record<string, string>[] = [];
    if (payload.email) filterQuery.push({ email: payload.email });
    if (payload.username) filterQuery.push({ username: payload.username });

    const userToLogin = await User.findOne({
      where: { [Op.or]: filterQuery },
    });

    if (!userToLogin) {
      throw new UserNotFoundError('Compte non trouvé');
    }

    if (userToLogin.locked) {
      throw new UserLockedError(
        'Votre compte est bloqué, veuillez contacter l\'administrateur !',
      );
    }

    await AuthPasswordService.validatePassword(
      userToLogin,
      payload.password,
    );

    return userToLogin;
  },

  checkTokenFromRequestToken(payload: {req: Request} | { token: string}): string {
    const tokenPrefix = AuthService.getLoggedTokenPrefix(payload);
    if (tokenPrefix !== 'Bearer') {
      throw new AuthInvalidTokenError('Token invalid');
    }

    const token = AuthService.getLoggedToken(payload);

    if (!token) {
      throw new AuthNoTokenProvidedError('Pas de Token fournis !');
    }

    return token;
  },

  async checkUserLoggedFromRequestToken(payload: {req: Request} | { token: string}): Promise<User> {
    const token = AuthService.checkTokenFromRequestToken(payload);

    const isTokenBlacklisted = await BlacklistTokenService.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
      throw new AuthTokenBlacklistedError('Session expirée, veuillez vous reconnecter !');
    }

    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err: null, decoded: TokenDecodedI) => {
        if (err) {
          throw new AuthInvalidTokenError('Veuillez vous connectez !');
        }

        if (!decoded.type || decoded.type !== TokenTypeE.MAIN_TOKEN) {
          throw new AuthInvalidTokenError('Token invalid');
        }

        if (!decoded.id) {
          throw new AuthInvalidTokenError('Token does not contain a valid user ID');
        }

        const user = await User
          .findByPk(decoded.id, {
            include: [
              {
                model: Role,
                include: [Permission],
              },
              {
                model: Branch,
                include: [
                  {
                    model: Bank,
                    attributes: ['bankId'],
                  },
                ],
              },
            ],
          });

        if (!user) {
          throw new AuthUserNotFoundError('Veuillez vous connectez !');
        } else if (user.locked) {
          throw new AuthUserLockedError('Votre compte est bloqué, veuillez contacter l\'administrateur !');
        } else {
          resolve(user);
        }
      });
    });
  },
};

export default AuthService;
