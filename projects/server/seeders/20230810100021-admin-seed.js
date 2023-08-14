"use strict";

const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("Admin12@", 10);
    // const adminUuid = uuidv4();

    return queryInterface.bulkInsert("Users", [
      {
        fullName: "Admin User",
        email: "admin@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "admin",
        password: hashedPassword,
        birthday: "1990-01-01",
        // roleID: 1,
        daysalary: 100000,
        baseSalary: 5000000,
        income: 10000,
        isActive: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // Delete the admin user data
    return queryInterface.bulkDelete("Users", { username: "admin" });
  },
};
