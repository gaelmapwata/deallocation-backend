export default class ClientAuthTokenBlacklistedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientAuthTokenBlacklistedError';
  }
}
