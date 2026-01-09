import User from '../../models/User';
import { PasswordStrategy } from './strategies/PasswordStrategy';
import { PartnerUserPasswordStrategy } from './strategies/PartnerUserPasswordStrategy';
import { BankUserPasswordStrategy } from './strategies/BankUserPasswordStrategy';

export default class AuthPasswordService {
  static async validatePassword(user: User, password: string): Promise<void> {
    const PARTNER_TYPE_ID = 2;
    let strategy: PasswordStrategy;

    if (user.isPartner && user.typeUserId === PARTNER_TYPE_ID) {
      strategy = new PartnerUserPasswordStrategy();
    } else {
      strategy = new BankUserPasswordStrategy();
    }

    await strategy.validate(user, password);
  }
}
