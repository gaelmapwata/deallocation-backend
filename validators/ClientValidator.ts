import ValidatorHelper from './helpers/ValidatorHelper';
import Client from '../models/Client';

const ClientValidators = {
  signinSchema: {
    email: new ValidatorHelper('email')
      .optional()
      .get(),
    password: new ValidatorHelper('mot de passe')
      .notEmpty()
      .get(),
  },
  changePasswordSchema: {
    oldPassword: new ValidatorHelper('ancien mot de passe')
      .notEmpty()
      .get(),
    newPassword: new ValidatorHelper('nouveau mot de passe')
      .notEmpty()
      .get(),
  },
  storeSchema: {
    email: new ValidatorHelper('email')
      .notEmpty()
      .isEmail()
      .notExistsInDB(Client, 'email')
      .get(),
    password: new ValidatorHelper('mot de passe').notEmpty().isString().get(),
  },
  updateSchema: {
    email: new ValidatorHelper('email')
      .optional()
      .isEmail()
      .notExistsInDBIfUpdated(Client, 'email')
      .get(),
    password: new ValidatorHelper('mot de passe').optional().isString().get(),
  },
};

export default ClientValidators;
