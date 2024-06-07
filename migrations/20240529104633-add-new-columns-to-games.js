'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('games', 'goals', {
      type: Sequelize.STRING(300),
      allowNull: true
    });
    await queryInterface.addColumn('games', 'instruction', {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true
    });
    await queryInterface.addColumn('games', 'order', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('games', 'goals');
    await queryInterface.removeColumn('games', 'instruction');
    await queryInterface.removeColumn('games', 'order');
  }
};
