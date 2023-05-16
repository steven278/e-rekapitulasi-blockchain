'use strict';

const districts = require('../masterdata/district.json').map((district) => {
  district.createdAt = new Date();
  district.updatedAt = new Date();
  return district
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Districts', districts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Districts', null, { truncate: true });
  }
};
