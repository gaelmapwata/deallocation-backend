// eslint-disable-next-line no-shadow
export enum TokenTypeE {
  LOGIN_TOKEN = 'LOGIN_TOKEN'
}

export interface TokenDecodedI {
  id: number,
  type: TokenTypeE
}
