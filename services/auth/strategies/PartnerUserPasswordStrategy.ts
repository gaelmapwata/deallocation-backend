import bcrypt from 'bcryptjs';
import { PasswordStrategy } from './PasswordStrategy';
import AuthInvalidPasswordError from '../../../types/error/AuthInvalidPasswordError';
import User from '../../../models/User';

// eslint-disable-next-line import/prefer-default-export
export class PartnerUserPasswordStrategy implements PasswordStrategy {
  // eslint-disable-next-line class-methods-use-this
  async validate(user: User, password: string): Promise<void> {
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new AuthInvalidPasswordError('Mot de passe invalide');
    }
  }
}
