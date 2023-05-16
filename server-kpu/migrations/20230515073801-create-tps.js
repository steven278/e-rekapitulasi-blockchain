'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tps', {
      id_TPS: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      no_TPS: {
        type: Sequelize.STRING
      },
      id_kelurahan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tps');
  }
};