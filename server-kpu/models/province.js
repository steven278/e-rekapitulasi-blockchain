'use strict';
const {
  Model
} = require('sequelize');
require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province.hasMany(models.City, {
        foreignKey: 'id_provinsi'
      })
    }
  }
  Province.init({
    id_provinsi: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_provinsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};