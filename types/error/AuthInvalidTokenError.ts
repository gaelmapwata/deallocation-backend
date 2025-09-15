export default class AuthInvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthInvalidTokenError';
  }
}
