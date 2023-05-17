'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubDistrict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubDistrict.belongsTo(models.District)
      SubDistrict.hasMany(models.Tps, {
        foreignKey: 'id_kelurahan'
      })
    }
  }
  SubDistrict.init({
    id_kelurahan: DataTypes.STRING,
    nama_kelurahan: DataTypes.STRING,
    id_kecamatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubDistrict',
  });
  return SubDistrict;
};