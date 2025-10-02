export default class ClientAuthLockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientAuthLockedError';
  }
}
