"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the seed data
    const userRolesData = [
      { name: "Admin" },
      { name: "User" },
      { name: "Creator" },
      { name: "Reviewer" },
    ];

    // Insert the seed data into the table
    await queryInterface.bulkInsert("user_roles", userRolesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted seed data
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
