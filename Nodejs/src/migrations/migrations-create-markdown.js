"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("markdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      clinicId: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      specialtyid: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      contentHTML: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      contentMarkdown: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("markdowns");
  },
};
