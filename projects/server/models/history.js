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
      // Define association here
      this.belongsTo(models.User, { foreignKey: "userID" });
      this.belongsTo(models.Salary, { foreignKey: "salaryID" });
    }
  }

  History.init(
    {
      userID: DataTypes.INTEGER,
      salaryID: DataTypes.INTEGER,
      ClockIn: DataTypes.DATE,
      ClockOut: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      HourlyWorks: DataTypes.FLOAT,
      DaySalary: DataTypes.INTEGER,
      Month: DataTypes.INTEGER,
      Deduction: DataTypes.INTEGER,
      isOvertime: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "History",
    }
  );

  return History;
};