"use strict";

const {
  dbNameTables,
} = require("../../../shared/constants/db-name-tables.cjs");

const SEEDS = [{ name: "", slug: "" }];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(dbNameTables.zones, SEEDS);
  },
  async down(queryInterface, Sequelize) {},
};
