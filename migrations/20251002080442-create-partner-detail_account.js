/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partner_detail_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountNumber: {
        type: Sequelize.STRING,
      },
      currencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'currencies',
          key: 'id',
        },
      },
      partnerDetailId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'partner_details',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('partner_detail_accounts');
  },
};
