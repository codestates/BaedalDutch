'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.parties.belongsToMany(models.users, {
      //   through: "users_parties",
      //   foreignKey: "parties_id"
      // });
      models.parties.belongsTo(models.users, {
        foreignKey: 'writeUser_id',
        targetKey: 'id',
      })
      models.parties.hasMany(models.users_parties, {
        foreignKey: 'parties_id',
        sourceKey: 'id',
      })
    }
  }
  parties.init(
    {
      store_name: DataTypes.STRING,
      food_category: DataTypes.STRING,
      member_num: DataTypes.INTEGER,
      content: DataTypes.STRING,
      fee: DataTypes.INTEGER,
      address: DataTypes.STRING,
      closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'parties',
    },
  )
  return parties
}
