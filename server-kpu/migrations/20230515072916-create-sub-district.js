'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubDistricts', {
      id_kelurahan: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_kelurahan: {
        type: Sequelize.STRING
      },
      id_kecamatan: {
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
    await queryInterface.dropTable('SubDistricts');
  }
};