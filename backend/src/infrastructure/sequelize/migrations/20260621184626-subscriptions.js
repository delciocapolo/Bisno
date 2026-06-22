'use strict';

const { dbNameTables } = require("../../../shared/constants/db-name-tables");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(dbNameTables.subscriptions, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      name: {
        type: Sequelize.STRING(150),
        unique: "idxname",
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(150),
        unique: "idxslug",
        allowNull: false,
      },
      points: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(dbNameTables.subscriptions);
  }
};