import ValidatorHelper from './helpers/ValidatorHelper';

const PartnerDetailAccountValidator = {
  storeSchema: {
    accountNumber: new ValidatorHelper('numeros de compte ')
      .notEmpty()
      .isString()
      .get(),
  },
  updateSchema: {
    accountNumber: new ValidatorHelper('numeros de compte ')
      .optional()
      .isString()
      .get(),
  },
};

export default PartnerDetailAccountValidator;
