'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Districts', {
      id_kecamatan: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_kecamatan: {
        type: Sequelize.STRING
      },
      id_kota: {
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
    await queryInterface.dropTable('Districts');
  }
};