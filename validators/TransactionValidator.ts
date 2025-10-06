const TransactionValidator = {
  storeTransactionSchema: {
    msisdn: {
      notEmpty: {
        errorMessage: 'The "msisdn" field is mandatory',
      },
    },
    currency: {
      notEmpty: {
        errorMessage: 'The "currency" field is mandatory',
      },
    },
    amount: {
      notEmpty: {
        errorMessage: 'The "amount" field is mandatory',
      },
      isFloat: {
        errorMessage: 'The "amount" field must be a valid decimal.',
      },
    },
  },
};

export default TransactionValidator;
