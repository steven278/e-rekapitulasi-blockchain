'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsTo(models.Province)
      City.hasMany(models.District, {
        foreignKey: 'id_kota'
      })
    }
  }
  City.init({
    id_kota: DataTypes.STRING,
    nama_kota: DataTypes.STRING,
    id_provinsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};