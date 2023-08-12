"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      userID: DataTypes.INTEGER,
      ClockIn: DataTypes.DATE,
      ClockOut: DataTypes.DATE,
      DaySalary: DataTypes.INTEGER,
      isOvertime: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "History",
      createdAt: "ClockIn",
      updatedAt: "ClockOut",
    }
  );
  return History;
};
