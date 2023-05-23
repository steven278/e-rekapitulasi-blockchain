'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      District.belongsTo(models.City, {
        foreignKey: 'id_kota'
      })
      District.hasMany(models.SubDistrict, {
        foreignKey: 'id_kecamatan'
      })
    }
  }
  District.init({
    id_kecamatan: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_kecamatan: DataTypes.STRING,
    id_kota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};