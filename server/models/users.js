"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // models.users.hasMany(models.parties, {
      //   foreignKey: "writeUser_id",
      //   sourceKey: "id",
      // });
      models.users.hasMany(models.users_parties, {
        foreignKey: "users_id",
        sourceKey: "id",
      });
      // models.users.belongsToMany(models.parties, {
      //   through: "users_parties",
      //   foreignKey: "users_id",
      // });
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
      modelName: "users",
    }
  );
  return users;
};
