export default class AuthTokenBlacklistedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthTokenBlacklistedError';
  }
}
