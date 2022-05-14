'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users_parties.belongsTo(models.users, {
        foreignKey: "users_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
      models.users_parties.belongsTo(models.parties, {
        foreignKey: "parties_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  users_parties.init({
    users_id: {
      type: DataTypes.INTEGER,
    },
    parties_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'users_parties',
  });
  return users_parties;
};