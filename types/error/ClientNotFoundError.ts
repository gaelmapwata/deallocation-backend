export default class ClientNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientNotFoundError';
  }
}
