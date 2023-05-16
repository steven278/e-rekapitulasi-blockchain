'use strict';

const subdistricts = require('../masterdata/subdistrict.json').map((subdistrict) => {
  subdistrict.createdAt = new Date();
  subdistrict.updatedAt = new Date();
  return subdistrict
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SubDistricts', subdistricts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SubDistricts', null, { truncate: true });
  }
};
