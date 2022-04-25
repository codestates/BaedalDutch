"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class parties extends Model {
    static associate(models) {
      models.parties.belongsTo(models.users, {
        foreignKey: "writeUser_id",
        targetKey: "id",
      });
      models.parties.hasMany(models.users_parties, {
        foreignKey: "parties_id",
        sourceKey: "id",
      });
      // models.parties.belongsToMany(models.users, {
      //   through: "users_parties",
      //   foreignKey: "parties_id",
      // });
    }
  }
  parties.init(
    {
      writeUser_id: DataTypes.INTEGER,
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
      modelName: "parties",
    }
  );
  return parties;
};
