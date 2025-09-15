export default class AuthInvalidPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthInvalidPasswordError';
  }
}
