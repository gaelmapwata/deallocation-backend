export default class ClientAuthInvalidPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientAuthInvalidPasswordError';
  }
}
