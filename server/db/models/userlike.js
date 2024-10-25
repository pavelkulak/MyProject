'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLike extends Model {
    static associate(models) {
      // Связь с моделью User
      UserLike.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  UserLike.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cocktailId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cocktailName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cocktailImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'UserLike',
      tableName: 'user_likes', // Указываем имя таблицы
    }
  );
  return UserLike;
};
