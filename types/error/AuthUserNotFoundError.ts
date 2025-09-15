export default class AuthUserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthUserNotFoundError';
  }
}
