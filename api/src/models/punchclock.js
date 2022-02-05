'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PunchClock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: {
          name: 'employee_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    }
  }
  PunchClock.init({
    date: DataTypes.DATE,
    employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PunchClock',
    tableName: 'PunchClock'
  });
  return PunchClock;
};