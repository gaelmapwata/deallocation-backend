/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      msisdn: {
        type: Sequelize.STRING,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DECIMAL(18, 9),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      drAcctNum: {
        type: Sequelize.STRING,
      },
      crAcctNum: {
        type: Sequelize.STRING,
      },
      stan: {
        type: Sequelize.STRING,
      },
      tranDateTime: {
        type: Sequelize.STRING,
      },
      processingCode: {
        type: Sequelize.INTEGER,
      },
      countryCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valueDate: {
        type: Sequelize.DATE,
      },
      reservedFld1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      errorFinacle: {
        type: Sequelize.STRING,
      },
      error: {
        type: Sequelize.STRING,
      },
      success: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
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
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('transactions');
  },
};
