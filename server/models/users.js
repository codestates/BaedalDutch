<<<<<<< HEAD
'use strict'
const { Model } = require('sequelize')
=======
"use strict"
const { Model } = require("sequelize")
>>>>>>> e9ac245c3d117d2f3ea08e54219fda720a2d8e4c
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
        foreignKey: "leader",
        sourceKey: "id",
        onDelete: "CASCADE"
      });
      models.users.hasMany(models.users_parties, {
        foreignKey: "users_id",
        sourceKey: "id",
        onDelete: "CASCADE"
      });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
<<<<<<< HEAD
      modelName: 'users',
    },
=======
      modelName: "users",
    }
>>>>>>> e9ac245c3d117d2f3ea08e54219fda720a2d8e4c
  )
  return users
}
