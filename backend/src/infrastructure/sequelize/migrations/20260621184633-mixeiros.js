"use strict";

const {
  dbNameTables,
} = require("../../../shared/constants/db-name-tables.cjs");
const {
  onDownUpdateRowTrigger,
  onUpdateRowTrigger,
} = require("../utils/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(dbNameTables.mixeiros, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      category_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.categoryServices,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      zone_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: dbNameTables.zones,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      custom_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fullname: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: "idxemail",
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bi: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      mobile: {
        allowNull: false,
        unique: "idxmobile",
        type: Sequelize.STRING(15),
      },
      has_whatsapp: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      is_active: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      is_locked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      channel: {
        allowNull: false,
        defaultValue: "mobile",
        type: Sequelize.ENUM("whatsapp", "mobile", "email"),
      },
      verified_at: {
        allowNull: true,
        type: Sequelize.DATE,
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

    await queryInterface.addIndex(dbNameTables.mixeiros, ["bi"]);
    await onUpdateRowTrigger(queryInterface, dbNameTables.mixeiros);
  },

  async down(queryInterface, Sequelize) {
    await onDownUpdateRowTrigger(queryInterface, dbNameTables.mixeiros);
    await queryInterface.dropTable(dbNameTables.mixeiros);
  },
};
