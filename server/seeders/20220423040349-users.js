"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          email: "test@test.com",
          nickname: "Kimcoding",
          password: "1234",
          image: "프로필 이미지",
          phone_number: "010-1111-1111",
          createdAt,
          updatedAt,
        },
        {
          id: 2,
          email: "test1@test.com",
          nickname: "Parkhacker",
          password: "1234",
          image: "프로필 이미지",
          phone_number: "010-2222-2222",
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
