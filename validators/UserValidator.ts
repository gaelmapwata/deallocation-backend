import Role from '../models/Role';
import User from '../models/User';
import ValidatorHelper from './helpers/ValidatorHelper';

const UserValidators = {
  storeSchema: {
    email: new ValidatorHelper('email')
      .notEmpty()
      .isEmail()
      .notExistsInDB(User, 'email')
      .get(),
    username: new ValidatorHelper('nom d\'utilisateur')
      .optional({ nullable: true })
      .notExistsInDB(User, 'username')
      .get(),
    firstName: new ValidatorHelper('Prénom').isString().notEmpty().get(),
    lastName: new ValidatorHelper('Nom').isString().notEmpty().get(),
    password: new ValidatorHelper('mot de passe').notEmpty().isString().get(),
    roles: new ValidatorHelper('roles').optional().isArray().get(),
    'roles.*': new ValidatorHelper('role').isInt().existsInDB(Role, 'id').get(),
  },

  updateSchema: {
    email: new ValidatorHelper('email')
      .optional()
      .isEmail()
      .notExistsInDBIfUpdated(User, 'email')
      .get(),
    username: new ValidatorHelper('nom d\'utilisateur')
      .optional({ nullable: true })
      .isString()
      .notExistsInDBIfUpdated(User, 'username')
      .get(),
    firstName: new ValidatorHelper('Prénom').optional().isString().get(),
    lastName: new ValidatorHelper('Nom').optional().isString().get(),
    password: new ValidatorHelper('mot de passe').optional().isString().get(),
    roles: new ValidatorHelper('roles').optional().isArray().get(),
    'roles.*': new ValidatorHelper('role').isInt().existsInDB(Role, 'id').get(),
  },

  addRolesSchema: {
    roles: new ValidatorHelper('roles').optional().isArray().get(),
    'roles.*': new ValidatorHelper('role').isInt().existsInDB(Role, 'id').get(),
  },

};

export default UserValidators;
