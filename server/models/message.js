'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.user, {
        as: "sourceMessage",
        foreignKey: {
          name: "sourceIdMessage",
        },
      });
      message.belongsTo(models.user, {
        as: "targetMessage",
        foreignKey: {
          name: "targetIdMessage",
        },
      });
    }
  }
  message.init({
    sourceIdMessage: DataTypes.INTEGER,
    targetIdMessage: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};