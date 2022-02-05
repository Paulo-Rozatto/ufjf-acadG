'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Workout, {
        foreignKey: {
          name: 'workout_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    }
  }
  Exercise.init({
    name: DataTypes.STRING,
    sets: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    workout_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exercise',
    tableName: 'Exercise',
  });
  return Exercise;
};