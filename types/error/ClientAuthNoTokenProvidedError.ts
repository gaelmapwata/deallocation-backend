export default class ClientAuthNoTokenProvidedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientAuthNoTokenProvidedError';
  }
}
