export default class ClientLockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientLockedError';
  }
}
