"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "parties",
      [
        {
          id: 1,
          writeUser_id: 1,
          store_name: "엽떡",
          food_category: "떡볶이",
          member_num: 4,
          content: "떡볶이 같이 시키실 분",
          fee: 10000,
          address: "강남역",
          closed: false,
          createdAt,
          updatedAt,
        },
        {
          id: 2,
          writeUser_id: 2,
          store_name: "굽네치킨",
          food_category: "치킨",
          member_num: 4,
          content: "치킨 같이 시키실 분",
          fee: 10000,
          address: "압구정역",
          closed: false,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parties", null, {});
  },
};
