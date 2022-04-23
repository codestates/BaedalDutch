"use strict";

const createdAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users_parties",
      [
        {
          users_id: 1,
          parties_id: 1,
          createdAt,
        },
        {
          users_id: 2,
          parties_id: 2,
          createdAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_parties", null, {});
  },
};
