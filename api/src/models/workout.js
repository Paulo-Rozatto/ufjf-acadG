'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Member, {
        foreignKey: {
          name: 'member_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });

      this.belongsTo(models.Instructor, {
        foreignKey: {
          name: 'instuctor_id',
          allowNull: false
        },
      });
    }
  }
  Workout.init({
    start_date: DataTypes.DATE,
    expire_date: DataTypes.DATE,
    member_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Workout',
    tableName: 'Workout'
  });
  return Workout;
};