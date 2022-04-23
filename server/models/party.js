"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.party.belongsToMany(models.user, {
        through: "user_party",
        foreignKey: "party_id",
      });
    }
  }
  party.init(
    {
      user_id: DataTypes.INTEGER,
      store_name: DataTypes.STRING,
      food_category: DataTypes.STRING,
      member_num: DataTypes.INTEGER,
      content: DataTypes.STRING,
      fee: DataTypes.INTEGER,
      address: DataTypes.STRING,
      closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "party",
    }
  );
  return party;
};
