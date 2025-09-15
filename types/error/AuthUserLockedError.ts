export default class AuthUserLockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthUserLockedError';
  }
}
