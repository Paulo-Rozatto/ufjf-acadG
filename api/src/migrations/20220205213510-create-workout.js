'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATE
      },
      expire_date: {
        type: Sequelize.DATE
      },
      member_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Members',
          key: 'id',
          as: 'member_id',
        }
      },
      instructor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Instructors',
          key: 'id',
          as: 'instructor_id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workouts');
  }
};