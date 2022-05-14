'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      leader: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
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
      total_num: {
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
    await queryInterface.dropTable('parties')
  },
}
