'use strict';

const { dbNameTables } = require("../../../shared/constants/db-name-tables");
const { 
  onUpdateRowTrigger,
  onDownUpdateRowTrigger, 
  onConstraintCheckNonNegativeInteger, 
  onDownConstraintCheckNonNegativeInteger
} = require("../utils/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(dbNameTables.mixeiroHasSubcription, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid')
      },
      subscription_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.subscriptions,
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      mixeiro_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.mixeiros,
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      points: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      activated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(dbNameTables.mixeiroHasSubcription, ['subscription_id', 'mixeiro_id']);
    await onConstraintCheckNonNegativeInteger(queryInterface, dbNameTables.mixeiroHasSubcription, "points");
    await onUpdateRowTrigger(queryInterface, dbNameTables.mixeiroHasSubcription);
  },

  async down (queryInterface, Sequelize) {
    await onDownConstraintCheckNonNegativeInteger(queryInterface, dbNameTables.mixeiroHasSubcription, "points");
    await onDownUpdateRowTrigger(queryInterface, dbNameTables.mixeiroHasSubcription);
    await queryInterface.dropTable(dbNameTables.mixeiroHasSubcription);
  }
};
