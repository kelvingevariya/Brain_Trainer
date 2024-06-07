'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_games_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_games_history.init({
    id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_games_history',
  });
  return user_games_history;
};