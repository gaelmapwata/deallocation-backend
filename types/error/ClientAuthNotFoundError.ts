export default class ClientAuthNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientAuthNotFoundError';
  }
}
