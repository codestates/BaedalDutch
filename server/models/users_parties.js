"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.belongsToMany(models.parties, {
        through: "user_party",
        foreignKey: "user_id",
      });
    }
  }
  users_parties.init(
    {
      users_id: DataTypes.INTEGER,
      parties_id: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "users_parties",
    }
  );
  return users_parties;
};
