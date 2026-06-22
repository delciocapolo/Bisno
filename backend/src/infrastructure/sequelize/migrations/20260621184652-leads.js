'use strict';

const { dbNameTables } = require("../../../shared/constants/db-name-tables");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(dbNameTables.leads, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid')
      },
      bisno_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.bisnos,
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
      notified_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      responded_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        defaultValue: "sent",
        type: Sequelize.ENUM('sent', 'accepted', 'expired'),
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

    await queryInterface.addIndex(dbNameTables.leads, ['bisno_id', 'mixeiro_id']);
    await onUpdateRowTrigger(queryInterface, dbNameTables.leads);
  },

  async down (queryInterface, Sequelize) {
    await onDownUpdateRowTrigger(queryInterface, dbNameTables.leads);
    await queryInterface.dropTable(dbNameTables.leads);
  }
};
