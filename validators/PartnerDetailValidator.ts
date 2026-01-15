import ValidatorHelper from './helpers/ValidatorHelper';

const PartnerDetailValidators = {
  storeSchema: {
    partnerName: new ValidatorHelper('nom du partenaire')
      .notEmpty()
      .isString()
      .get(),
    partnerAddress: new ValidatorHelper('l\'adresse du partenanire')
      .notEmpty()
      .isString()
      .get(),
    partnerPhone: new ValidatorHelper('le numeros du partenanire')
      .notEmpty()
      .isString()
      .get(),
  },
  updateSchema: {
    partnerName: new ValidatorHelper('nom du partenaire')
      .optional()
      .isString()
      .get(),
    partnerAddress: new ValidatorHelper('l\'adresse du partenanire')
      .optional()
      .isString()
      .get(),
    partnerPhone: new ValidatorHelper('le numeros du partenanire')
      .optional()
      .isString()
      .get(),
  },
};

export default PartnerDetailValidators;
