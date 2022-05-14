'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.users.belongsToMany(models.parties, {
      //   through: "users_parties",
      //   foreignKey: "users_id"
      // });
      models.users.hasMany(models.parties, {
        foreignKey: 'leader',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      })
      models.users.hasMany(models.users_parties, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      })
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        defaultValue:
          'https://baedaldutch-profile.s3.ap-northeast-2.amazonaws.com/people.png',
      },
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,

      modelName: 'users',
    },
  )
  return users
}
