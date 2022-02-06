'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      feed.belongsTo(models.user, {
        as: "feedId",
        foreignKey: {
          name: "userIdFeed",
        },
      });  
      feed.hasMany(models.like, {
        as: "likeFeed",
        foreignKey: {
          name: "feedIdLike",
        },
      });    
      feed.hasMany(models.comment, {
        as: "feedComment",
        foreignKey: {
          name: "feedIdComment",
        },
      });       
    }
  }
  feed.init({
    userIdFeed: DataTypes.INTEGER,
    image: DataTypes.STRING,
    caption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feed',
  });
  return feed;
};