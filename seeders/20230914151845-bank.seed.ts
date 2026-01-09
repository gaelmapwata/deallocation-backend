/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const now = new Date();
    await queryInterface.bulkInsert('banks', [
      {
        id: 1, label: 'Congo DR', countryId: 45, bankId: 'CD', createdAt: now, updatedAt: now,
      },
      {
        id: 2, label: 'Cameroun', countryId: 44, bankId: 'CM', createdAt: now, updatedAt: now,
      },
      {
        id: 3, label: 'Gambia', countryId: 83, bankId: 'GM', createdAt: now, updatedAt: now,
      },
      {
        id: 4, label: 'Congo Brazza', countryId: 46, bankId: 'CO', createdAt: now, updatedAt: now,
      },
      {
        id: 5, label: 'Tchad', countryId: 206, bankId: 'TD', createdAt: now, updatedAt: now,
      },
      {
        id: 6, label: 'Burkina Faso', countryId: 21, bankId: 'BF', createdAt: now, updatedAt: now,
      },
      {
        id: 7, label: 'Bissau Guinee', countryId: 84, bankId: 'GW', createdAt: now, updatedAt: now,
      },
      {
        id: 8, label: 'Cote Ivoire', countryId: 43, bankId: 'CI', createdAt: now, updatedAt: now,
      },
      {
        id: 9, label: 'Guinnee', countryId: 85, bankId: 'GQ', createdAt: now, updatedAt: now,
      },
      {
        id: 10, label: 'Mali', countryId: 139, bankId: 'ML', createdAt: now, updatedAt: now,
      },
      {
        id: 11, label: 'Senegal', countryId: 186, bankId: 'SN', createdAt: now, updatedAt: now,
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('banks', {}, {});
  },
};
