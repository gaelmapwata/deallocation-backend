import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Client from '../models/PartnerDetail';
import { Request } from '../types/ExpressOverride';
import ClientAuthInvalidPasswordError from '../types/error/ClientAuthInvalidPasswordError';
import ClientLockedError from '../types/error/ClientLockedError';
import ClientNotFoundError from '../types/error/ClientNotFoundError';
import ClientAuthInvalidTokenError from '../types/error/ClientAuthInvalidTokenError';
import ClientAuthNoTokenProvidedError from '../types/error/ClientAuthNoTokenProvidedError';
import { TokenDecodedI, TokenTypeE } from '../types/Token';
import ClientAuthTokenBlacklistedError from '../types/error/ClientAuthTokenBlacklistedError';
import ClientAuthNotFoundError from '../types/error/ClientAuthNotFoundError';
import BlacklistTokenService from './BlacklistTokenService';

// eslint-disable-next-line
const jwt = require('jsonwebtoken');

const ClientAuthService = {
  getAuthorizationHeader(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    return authHeader;
  },

  getLoggedTokenPrefix(payload: {req: Request} | { token: string}): string | undefined {
    let authHeader: string;
    if ('req' in payload) {
      authHeader = ClientAuthService.getAuthorizationHeader(payload.req) as string;
    } else {
      authHeader = payload.token;
    }
    return authHeader ? authHeader.split(' ')[0] as string : undefined;
  },

  getLoggedToken(payload: {req: Request} | { token: string}): string | undefined {
    let authHeader: string;
    if ('req' in payload) {
      authHeader = ClientAuthService.getAuthorizationHeader(payload.req) as string;
    } else {
      authHeader = payload.token;
    }
    return authHeader ? authHeader.split(' ')[1] as string : undefined;
  },

  async checkUserPasswordValidity(payload: {
    email?: string,
    password: string,
  }): Promise<Client> {
    if (!payload.email) {
      throw new ClientNotFoundError('Email  requis');
    }

    const filterQuery: Record<string, string>[] = [];
    if (payload.email) {
      filterQuery.push({ email: payload.email });
    }

    const clientToLogin = await Client.findOne({
      where: {
        [Op.or]: filterQuery,
      },
    });

    if (!clientToLogin) {
      throw new ClientNotFoundError('Compte non trouvé');
    }

    const passwordIsValid = bcrypt.compareSync(
      payload.password,
      clientToLogin.password,
    );

    if (!passwordIsValid) {
      throw new ClientAuthInvalidPasswordError('Mot de passe invalide');
    }

    if (clientToLogin.locked) {
      throw new ClientLockedError('Votre compte est bloqué, veuillez contacter l\'administrateur !');
    }

    return clientToLogin;
  },

  checkTokenFromRequestToken(payload: {req: Request} | { token: string}): string {
    const tokenPrefix = ClientAuthService.getLoggedTokenPrefix(payload);
    if (tokenPrefix !== 'Bearer') {
      throw new ClientAuthInvalidTokenError('Token invalid');
    }

    const token = ClientAuthService.getLoggedToken(payload);

    if (!token) {
      throw new ClientAuthNoTokenProvidedError('Pas de Token fournis !');
    }

    return token;
  },

  // eslint-disable-next-line max-len
  async checkUserLoggedFromRequestToken(payload: {req: Request} | { token: string}): Promise<Client> {
    const token = ClientAuthService.checkTokenFromRequestToken(payload);

    const isTokenBlacklisted = await BlacklistTokenService.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
      throw new ClientAuthTokenBlacklistedError('Session expirée, veuillez vous reconnecter !');
    }

    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err: null, decoded: TokenDecodedI) => {
        if (err) {
          throw new ClientAuthInvalidTokenError('Veuillez vous connectez !');
        }

        if (!decoded.type || decoded.type !== TokenTypeE.CLIENT_TOKEN) {
          throw new ClientAuthInvalidTokenError('Token invalid');
        }

        const client = await Client
          .findByPk(decoded.id);

        if (!client) {
          throw new ClientAuthNotFoundError('Veuillez vous connectez !');
        } else if (client.locked) {
          throw new ClientLockedError('Votre compte est bloqué, veuillez contacter l\'administrateur !');
        } else {
          resolve(client);
        }
      });
    });
  },
};

export default ClientAuthService;
