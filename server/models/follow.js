'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      follow.belongsTo(models.user, {
        as: "ToFollowing",
        foreignKey: {
          name: "fromFollow",
        },
      });
      follow.belongsTo(models.user, {
        as: "fromFollower",
        foreignKey: {
          name: "toFollow",
        },
      });            
    }
  }
  follow.init({
    fromFollow: DataTypes.INTEGER,
    toFollow: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'follow',
  });
  return follow;
};