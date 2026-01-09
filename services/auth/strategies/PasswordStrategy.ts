import User from '../../../models/User';

export interface PasswordStrategy {
  validate(user: User, password: string): Promise<void>;
}
