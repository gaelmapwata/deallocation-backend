import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { Request } from '../types/ExpressOverride';
import InvalidPasswordError from '../types/error/InvalidPasswordError';
import UserLockedError from '../types/error/UserLockedError';
import UserNotFoundError from '../types/error/UserNotFoundError';

const AuthService = {
  getAuthorizationHeader(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    return authHeader;
  },
  getLoggedTokenPrefix(req: Request): string | undefined {
    const authHeader = AuthService.getAuthorizationHeader(req);
    return authHeader ? authHeader.split(' ')[0] as string : undefined;
  },

  getLoggedToken(req: Request): string | undefined {
    const authHeader = AuthService.getAuthorizationHeader(req);
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
    if (payload.email) {
      filterQuery.push({ email: payload.email });
    }
    if (payload.username) {
      filterQuery.push({ username: payload.username });
    }

    const userToLogin = await User.findOne({
      where: {
        [Op.or]: filterQuery,
      },
    });

    if (!userToLogin) {
      throw new UserNotFoundError('Compte non trouvé');
    }

    const passwordIsValid = bcrypt.compareSync(
      payload.password,
      userToLogin.password,
    );

    if (!passwordIsValid) {
      throw new InvalidPasswordError('Mot de passe invalide');
    }

    if (userToLogin.locked) {
      throw new UserLockedError('Votre compte est bloqué, veuillez contacter l\'administrateur !');
    }

    return userToLogin;
  },
};

export default AuthService;
