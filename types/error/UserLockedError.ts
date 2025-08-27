export default class UserLockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserLockedError';
  }
}
