// services/RetrieveAccountService.ts
import axios from 'axios';
import LogHelper from '../utils/logHelper';

interface AccountDetailsPayload {
  account_num: string;
  country: string;
}

interface AccountDetailsResponse {
  customerId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

class RetrieveAccountService {
  // eslint-disable-next-line max-len, class-methods-use-this
  public async getAccountDetails(accountNumber: string, countryCode: string): Promise<AccountDetailsResponse> {
    try {
      const payload: AccountDetailsPayload = {
        account_num: accountNumber,
        country: countryCode,
      };

      const url = process.env.ACCOUNT_DETAILS_URL;
      const username = process.env.ACCOUNT_DETAILS_USERNAME;
      const password = process.env.ACCOUNT_DETAILS_PASSWORD;

      if (!url) {
        throw new Error('ACCOUNT_DETAILS_URL is not defined in environment variables');
      }

      if (!username) {
        throw new Error('ACCOUNT_DETAILS_USERNAME is not defined in environment variables');
      }

      if (!password) {
        throw new Error('ACCOUNT_DETAILS_PASSWORD is not defined in environment variables');
      }

      // eslint-disable-next-line max-len
      const response = await axios.post<AccountDetailsResponse>(url, payload, {
        auth: {
          username,
          password,
        },
        timeout: 5000,
      });

      const { data } = response;

      if (!data.Response) {
        LogHelper.info(`Account details not found for account: ${accountNumber}, country: ${countryCode}`, '');
        throw new Error('Account details not found or invalid.');
      }

      return data.Response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      LogHelper.info(`Failed to fetch account details for account ${accountNumber}, country ${countryCode}: ${error.message}`, error);
      throw new Error(`Failed to fetch account details: ${error.message}`);
    }
  }
}

export default new RetrieveAccountService();
