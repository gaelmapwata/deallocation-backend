export default class AuthNoTokenProvidedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthNoTokenProvidedError';
  }
}
