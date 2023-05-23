'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tps', 'wallet_address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Tps', 'txn_hash', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tps', 'wallet_address');
    await queryInterface.removeColumn('Tps', 'txn_hash');
  }
};
