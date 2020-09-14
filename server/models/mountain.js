'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mountain.init({
    name: DataTypes.STRING,
    altitude: DataTypes.INTEGER,
    location: DataTypes.GEOMETRY('POINT', 4326)
  }, {
    sequelize,
    modelName: 'Mountain',
    timestamps: false
  });
  return Mountain;
};