import FinacleTransaction from '../models/FinacleTransaction';

export default {
  // eslint-disable-next-line max-len
  saveTransactionFinacle: async (
    payload: {
      amount: number,
      currency: string,
      libelle: string,
      userId: number,
      transactionId: number,
      drAcctNum: string,
      crAcctNum: string
  },
  ) => {
    const transactionFinacle = await FinacleTransaction.create({
      tranAmt: payload.amount,
      tranCrncyCode: payload.currency,
      countryCode: 'COD',
      drAcctNum: payload.drAcctNum,
      crAcctNum: payload.crAcctNum,
      reservedFld1: `Deallocation ${payload.libelle}`,
      transactionId: payload.transactionId,
    });

    return transactionFinacle;
  },

};
