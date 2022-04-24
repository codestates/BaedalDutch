"use strict";
const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users_parties",
      [
        {
          users_id: 1,
          parties_id: 1,
          createdAt,
          updatedAt,
        },
        {
          users_id: 2,
          parties_id: 2,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_parties", null, {});
  },
};
