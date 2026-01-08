/* eslint-disable import/no-import-module-exports */
import { QueryInterface } from 'sequelize';
import sequelize from '../sequelize-instance';
import TypeUser from '../models/TypeUser';

interface ITypeUserPayload {
  name: string;
}

const TYPE_USERS: ITypeUserPayload[] = [
  {
    name: 'STAFF',
  },
  {
    name: 'PARTNER',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    // eslint-disable-next-line no-useless-catch
    try {
      await sequelize.authenticate();

      await TypeUser.bulkCreate(
        TYPE_USERS.map((typeUser) => ({
          name: typeUser.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        { ignoreDuplicates: true }, // optionnel
      );
    } catch (error) {
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('type_users', {
      name: ['STAFF', 'PARTNER'],
    });
  },
};
