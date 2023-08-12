"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      { role: "admin", createdAt: new Date(), updatedAt: new Date() },
      { role: "pegawai", createdAt: new Date(), updatedAt: new Date() },
    ]);
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "admin",
        email: "admin@gmail.com",
        username: "admin",
        password: "admin",
        birthday: new Date(1995, 0, 14),
        roleID: 1,
        baseSalary: 5000000,
        isLogin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});

    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
