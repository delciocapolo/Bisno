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
    await queryInterface.createTable(dbNameTables.bisnos, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid')
      },
      zone_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.zones,
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      service_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.services,
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      customer_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customer_mobile: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      customer_mobile_has_whatsapp: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: "pending",
        type: Sequelize.ENUM('pending', 'matched', 'done', 'exhausted'),
      },
      distributionRound: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

    await queryInterface.addIndex(dbNameTables.bisnos, ['zone_id', 'service_id']);
    await onConstraintCheckNonNegativeInteger(queryInterface, dbNameTables.bisnos, "distributionRound");
    await onUpdateRowTrigger(queryInterface, dbNameTables.bisnos);
  },

  async down (queryInterface, Sequelize) {
    await onDownUpdateRowTrigger(queryInterface, dbNameTables.bisnos);
    await onDownConstraintCheckNonNegativeInteger(queryInterface, dbNameTables.bisnos, "distributionRound");
    await queryInterface.dropTable(dbNameTables.bisnos);
  }
};
