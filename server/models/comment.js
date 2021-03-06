'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user, {
        as: "userComment",
        foreignKey: {
          name: "userIdComment",
        },
      });
      comment.belongsTo(models.feed, {
        as: "feedComment",
        foreignKey: {
          name: "feedIdComment",
        },
      });
    }
  }
  comment.init({
    feedIdComment: DataTypes.INTEGER,
    userIdComment: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};