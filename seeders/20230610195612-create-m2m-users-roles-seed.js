"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersRolesData = [
      {
        user_id: "ed28e92a-e142-4218-a155-a00407063046",
        role_id: "52d487fc-bd9a-49d3-b2de-79a389a9a28b",
      },
      {
        user_id: "ed28e92a-e142-4218-a155-a00407063046",
        role_id: "a7ed084e-9d7b-4002-aa84-800c57e546a8",
      },
    ];

    await queryInterface.bulkInsert("m2m_users_roles", usersRolesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("m2m_users_roles", null, {});
  },
};
