// eslint-disable-next-line import/prefer-default-export
export class AccountLockedError extends Error {
  constructor() {
    super('This account is locked');
  }
}
