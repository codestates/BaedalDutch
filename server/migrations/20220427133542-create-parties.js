<<<<<<< HEAD
'use strict'
=======
"use strict"
>>>>>>> 6594e76 (FIX:SERVER 오타)
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("parties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      writeUser_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
<<<<<<< HEAD
          model: 'users',
          key: 'id',
=======
          model: "users",
          key: "id",
>>>>>>> 6594e76 (FIX:SERVER 오타)
        },
      },
      store_name: {
        type: Sequelize.STRING,
      },
      food_category: {
        type: Sequelize.STRING,
      },
      member_num: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      fee: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      closed: {
        type: Sequelize.BOOLEAN,
      },
      lat: {
        type: Sequelize.STRING,
      },
      lng: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.dropTable('parties')
=======
    await queryInterface.dropTable("parties")
>>>>>>> 6594e76 (FIX:SERVER 오타)
  },
}
