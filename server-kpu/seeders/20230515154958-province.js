'use strict';

const provinces = require('../masterdata/province.json').map((province) => {
  province.createdAt = new Date();
  province.updatedAt = new Date();
  return province
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Provinces', provinces, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provinces', null, { truncate: true });
  }
};
