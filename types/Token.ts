// eslint-disable-next-line no-shadow
export enum TokenTypeE {
 PASSWORD_TOKEN = 'PASSWORD_TOKEN',
 MAIN_TOKEN = 'MAIN_TOKEN',
 CLIENT_TOKEN='CLIENT_TOKEN'
}

export interface TokenDecodedI {
  id: number,
  type: TokenTypeE
}
