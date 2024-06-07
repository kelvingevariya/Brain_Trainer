'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true
      },
      full_name: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      phone_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'Active'
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'member'
      },
      stripe_id: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      payment_method_attached: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      source: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      version: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      social_user_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true
      },
      social_platform: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      os: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      os_version: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      app_version: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      device: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      gps_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      microphone_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      push_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      email_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      reengagement_email_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      daily_push_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      camera_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      contacts_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('users');
  }
};
