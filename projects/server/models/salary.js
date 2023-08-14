"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      this.hasMany(models.History, { foreignKey: "salaryID" });
      this.belongsTo(models.User, { foreignKey: "userID" });
    }
  }

  Salary.init(
    {
        userID: DataTypes.INTEGER,
        TotalSalary: DataTypes.INTEGER,
        TotalDeduction: DataTypes.INTEGER,
        Month: DataTypes.INTEGER,
        Year: DataTypes.INTEGER      
    },
    {
      sequelize,
      modelName: "Salary",
    }
  );

  return Salary;
};