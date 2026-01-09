/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const now = new Date();
    await queryInterface.bulkInsert('branches', [
      {
        id: 1, bankId: 1, solId: '6801', label: 'Liberation', createdAt: now, updatedAt: now,
      },
      {
        id: 2, bankId: 1, solId: '6802', label: 'Civil Servent', createdAt: now, updatedAt: now,
      },
      {
        id: 3, bankId: 8, solId: '6101', label: 'Plateau', createdAt: now, updatedAt: now,
      },
      {
        id: 4, bankId: 8, solId: '6102', label: 'Treichville', createdAt: now, updatedAt: now,
      },
      {
        id: 5, bankId: 8, solId: '6103', label: 'Koumassi', createdAt: now, updatedAt: now,
      },
      {
        id: 6, bankId: 8, solId: '6104', label: 'Yopougon', createdAt: now, updatedAt: now,
      },
      {
        id: 7, bankId: 8, solId: '6105', label: 'Vallon', createdAt: now, updatedAt: now,
      },
      {
        id: 8, bankId: 8, solId: '6106', label: 'Adjamé', createdAt: now, updatedAt: now,
      },
      {
        id: 9, bankId: 8, solId: '6108', label: 'Angré', createdAt: now, updatedAt: now,
      },
      {
        id: 10, bankId: 8, solId: '6109', label: 'Anono', createdAt: now, updatedAt: now,
      },
      {
        id: 11, bankId: 8, solId: '6110', label: 'Abobo', createdAt: now, updatedAt: now,
      },
      {
        id: 12, bankId: 8, solId: '6111', label: 'Daloa', createdAt: now, updatedAt: now,
      },
      {
        id: 13, bankId: 8, solId: '6201', label: 'San Pédro', createdAt: now, updatedAt: now,
      },
      {
        id: 14, bankId: 1, solId: '6899', label: 'Head Office', createdAt: now, updatedAt: now,
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('branches', {}, {});
  },
};
