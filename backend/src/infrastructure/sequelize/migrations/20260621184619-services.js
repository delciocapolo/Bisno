"use strict";

const {
  dbNameTables,
} = require("../../../shared/constants/db-name-tables.cjs");
const {
  onUpdateRowTrigger,
  onDownUpdateRowTrigger,
} = require("../utils/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(dbNameTables.services, {
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
      icon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex(dbNameTables.services, ["category_id"]);
    await onUpdateRowTrigger(queryInterface, dbNameTables.services);
  },
  async down(queryInterface, Sequelize) {
    await onDownUpdateRowTrigger(queryInterface, dbNameTables.services);
    await queryInterface.dropTable(dbNameTables.services);
  },
};
