"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "AdminTK@gmail.com",
        password: "123456",
        firstName: "Trung",
        lastName: "Kien",
        address: "Vinh Phuc",
        gender: 1,
        roleId: "R1",
        phonenumber: "123456",
        image: "image",
        positionId: "doctor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
