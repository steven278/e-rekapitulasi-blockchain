'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tps.belongsTo(models.SubDistrict, {
        foreignKey: 'id_kelurahan'
      })
    }
  }
  Tps.init({
    // id_TPS: DataTypes.STRING,
    id_TPS: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    no_TPS: DataTypes.STRING,
    id_kelurahan: DataTypes.STRING,
    wallet_address: DataTypes.STRING,
    txn_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tps',
  });
  return Tps;
};