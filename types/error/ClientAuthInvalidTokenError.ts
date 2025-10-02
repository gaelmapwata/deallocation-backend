export default class ClientAuthInvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientAuthInvalidTokenError';
  }
}
