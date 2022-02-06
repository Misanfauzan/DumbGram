'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.follow, {
        as: "ToFollowing",
        foreignKey: {
          name: "fromFollow",
        },
      }); 
      user.hasMany(models.follow, {
        as: "fromFollower",
        foreignKey: {
          name: "toFollow",
        },
      });    
      user.hasMany(models.feed, {
        as: "feedId",
        foreignKey: {
          name: "userIdFeed",
        },
      }); 
      user.hasMany(models.comment, {
        as: "userComment",
        foreignKey: {
          name: "userIdComment",
        },
      });
      user.hasMany(models.message, {
        as: "sourceMessage",
        foreignKey: {
          name: "sourceIdMessage",
        },
      });
      user.hasMany(models.message, {
        as: "targetMessage",
        foreignKey: {
          name: "targetIdMessage",
        },
      });
    }
  }
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};