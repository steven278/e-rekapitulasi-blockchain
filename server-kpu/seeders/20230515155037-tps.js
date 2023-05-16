'use strict';

const Tps = require('../masterdata/tps.json').map((tps) => {
  tps.createdAt = new Date();
  tps.updatedAt = new Date();
  return tps
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tps', Tps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tps', null, { truncate: true });
  }
};
