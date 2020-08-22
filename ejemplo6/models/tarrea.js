'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarrea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tarrea.init({
    descripcion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tarrea',
  });
  return Tarrea;
};