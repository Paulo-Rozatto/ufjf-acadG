'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
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
  Instructor.init({
    cref: DataTypes.STRING,
    employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Instructor',
    tableName: 'Instructor'
  });
  return Instructor;
};