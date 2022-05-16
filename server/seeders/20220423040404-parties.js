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
          leader: 2,
          store_name: "엽떡",
          food_category: "3",
          member_num: 4,
          total_num: 1,
          content: "떡볶이 같이 시키실 분",
          fee: 10000,
          address: "강남역",
          closed: false,
          createdAt,
          updatedAt,
          lat: "1",
          lng: "2",
        },
        {
          id: 2,
          leader: 3,
          store_name: "굽네치킨",
          food_category: "1",
          member_num: 4,
          total_num: 1,
          content: "치킨 같이 시키실 분",
          fee: 10000,
          address: "압구정역",
          closed: false,
          createdAt,
          updatedAt,
          lat: "1",
          lng: "2",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parties", null, {});
  },
};
