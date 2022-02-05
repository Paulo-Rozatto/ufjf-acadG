'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    }
  }
  Employee.init({
    salary: DataTypes.DECIMAL,
    contract_status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'Employee',
  });
  return Employee;
};