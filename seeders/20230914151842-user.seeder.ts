/* eslint-disable import/no-import-module-exports */
import { QueryInterface } from 'sequelize';
import sequelize from '../sequelize-instance';
import User from '../models/User';
import BcryptUtil from '../utils/BcryptUtil';
import Role from '../models/Role';

interface IUserPayload {
  email: string;
  password: string;
  roleName: string;
  firstName: string;
  lastName: string;
}

const USERS: IUserPayload[] = [
  {
    email: 'admin@user.com',
    password: '1234',
    roleName: 'admin',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    email: 'user1@user.com',
    password: '1234',
    roleName: 'user',
    firstName: 'User1',
    lastName: 'User',
  },
  {
    email: 'user2@user.com',
    password: '1235',
    roleName: 'user',
    firstName: 'User2',
    lastName: 'User',
  },
  {
    email: 'user3@user.com',
    password: '1236',
    roleName: 'user',
    firstName: 'User3',
    lastName: 'User',
  },
];

async function saveUser(user: IUserPayload, role: Role | undefined) {
  try {
    const hashedPassword = await BcryptUtil.hashPassword(user.password);
    const [newUser] = await User.findOrCreate({
      where: { email: user.email },
      defaults: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: hashedPassword,
      },
    });
    newUser.$set('roles', role?.id ?? null);
    return newUser;
  } catch (error) {
    return Promise.reject(error);
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    return new Promise((resolve, reject) => {
      sequelize.authenticate()
        .then(async () => {
          const roles = await Role.findAll();
          Promise.all(
            USERS.map((user) => saveUser(user, roles.find((role) => role.name === user.roleName))),
          )
            .then(() => resolve(null));
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {}, {});
  },
};
