import { PasswordStrategy } from './PasswordStrategy';
import CryptoUtil from '../../../utils/CryptoUtil';
import AuthInvalidPasswordError from '../../../types/error/AuthInvalidPasswordError';
import activeDirectoryService from '../../activeDirectoryService';
import User from '../../../models/User';

// eslint-disable-next-line import/prefer-default-export
export class BankUserPasswordStrategy implements PasswordStrategy {
  // eslint-disable-next-line class-methods-use-this
  async validate(user: User, encryptedPassword: string): Promise<void> {
    const clearPassword = CryptoUtil.decrypt(encryptedPassword);

    const canLogin = await activeDirectoryService.login(
      user.email,
      clearPassword,
    );

    if (!canLogin) {
      throw new AuthInvalidPasswordError('Mot de passe invalide');
    }
  }
}
