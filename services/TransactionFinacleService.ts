import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { parseString } from 'xml2js';
// eslint-disable-next-line import/no-extraneous-dependencies
import xmlbuilder from 'xmlbuilder';
// import { format } from 'date-fns';
import FinacleTransaction from '../models/FinacleTransaction';
import ActionCodeFinacleUtilities from '../utils/actionCodeFinacle';
import AppError from '../types/CustomError';
import LogHelper from '../utils/logHelper';
import DateUtil from '../utils/DateUtil';

export default {
  // eslint-disable-next-line max-len
  sendTransaction: (transactionFinacle: FinacleTransaction) => new Promise<{ stan: string, tranDateTime: string, success:string }>((resolve, reject) => {
    LogHelper.info(`Transaction Finacle | sending transaction (${transactionFinacle.transactionId}) to Finacle`);

    const scaledAmount = (parseFloat(String(transactionFinacle.tranAmt)) * 100);
    const stan = Number(new Date().getTime().toString().substring(1));
    const tranDateTime = new DateUtil().formatDateDefault(new Date('2022-08-22'), 'YYYYMMDDHHMMSS');

    // for development
    // resolve({
    //   stan: stan.toString(),
    //   tranDateTime,
    //   success: 'true',
    // });

    // for production
    const xmlData = xmlbuilder.create('soapenv:Envelope', {
      version: '1.0',
      encoding: 'UTF-8',
    })
      .att('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/')
      .att('xmlns:fin', 'http://finaclews.org')
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('fin:sendTransaction')
      .ele('arg0')
      .dat(`<C24TRANREQ>
            <STAN>${stan}</STAN>
            <TRAN_DATE_TIME>${tranDateTime}</TRAN_DATE_TIME>
            <TRAN_AMT>${scaledAmount}</TRAN_AMT>
            <TRAN_SUB_TYPE>BI</TRAN_SUB_TYPE>
            <PROCESSING_CODE>50</PROCESSING_CODE>
            <TRAN_CRNCY_CODE>${transactionFinacle.tranCrncyCode}</TRAN_CRNCY_CODE>
            <COUNTRY_CODE>COD</COUNTRY_CODE>
            <VALUE_DATE>${new DateUtil().formatDate(new Date('2023-11-15'), 'YYYYMMDD')}</VALUE_DATE>
            <DR_ACCT_NUM>${transactionFinacle.drAcctNum}</DR_ACCT_NUM>
            <CR_ACCT_NUM>${transactionFinacle.crAcctNum}</CR_ACCT_NUM>
            <TERMINAL_NAME_LOC>Terminal</TERMINAL_NAME_LOC>
            <RESERVED_FLD_1>
              ${transactionFinacle.reservedFld1}
            </RESERVED_FLD_1>
          </C24TRANREQ>`)
      .up() // End arg0
      .up() // End fin:sendTransaction
      .up() // End soapenv:Body
      .end({ pretty: true });

    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
      Authorization: `Basic ${Buffer.from('GUPAY:waterfall').toString('base64')}`,
    };

    const logOnError = (err: Error | string) => {
      LogHelper.info(`Transaction Finacle | error occurred on transaction (${transactionFinacle.transactionId}), error: ${err}}`);
    };

    console.log(xmlData);

    axios.post(process.env.FINACLE_URL as string, xmlData, { headers })
      .then((response) => {
        parseString(response.data, (err: Error | null, result: any) => {
          const returnXmlString = result['NS1:Envelope']['NS1:Body'][0]['NS2:sendTransactionResponse'][0].return[0];
          parseString(returnXmlString, (error: Error | null, responseData: any) => {
            if (error) {
              logOnError(error);
              reject(error);
            }

            const actionCode = responseData.C24TRANRES.ACTION_CODE[0];
            const messageStatusCode = ActionCodeFinacleUtilities.getActionCodeFinacle(actionCode);

            if (messageStatusCode.isvalidate) {
              LogHelper.info(`Transaction Finacle | transaction (${transactionFinacle.transactionId}) successfully sended to Finacle`);

              resolve({ stan: stan.toString(), tranDateTime, success: 'true' });
            } else {
              logOnError(messageStatusCode.error);
              reject(new AppError(messageStatusCode.error, 400));
            }
          });
        });
      }).catch((err) => {
        console.log(err);
        logOnError(err);
        reject(err);
      });
  }),
};
