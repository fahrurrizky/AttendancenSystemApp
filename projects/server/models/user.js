"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, { foreignKey: "roleID" });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      username: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      birthday: DataTypes.DATE,
      roleID: DataTypes.INTEGER,
      baseSalary: DataTypes.INTEGER,
      isLogin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
