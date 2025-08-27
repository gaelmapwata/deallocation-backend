import ValidatorHelper from './helpers/ValidatorHelper';

const AuthValidators = {
  signinSchema: {
    email: new ValidatorHelper('email')
      .optional()
      .get(),
    username: new ValidatorHelper('username')
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
};

export default AuthValidators;
