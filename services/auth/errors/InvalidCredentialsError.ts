// eslint-disable-next-line import/prefer-default-export
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or password');
  }
}
