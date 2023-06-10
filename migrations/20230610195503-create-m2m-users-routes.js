"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the m2m_user_role table
    await queryInterface.createTable("m2m_users_roles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      role_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the m2m_user_role table
    await queryInterface.dropTable("m2m_users_roles");
  },
};
