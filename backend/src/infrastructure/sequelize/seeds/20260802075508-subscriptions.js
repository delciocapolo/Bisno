"use strict";

const {
  dbNameTables,
} = require("../../../shared/constants/db-name-tables.cjs");

const SEEDS = [{ name: "", slug: "", points: 50 }];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(dbNameTables.subscriptions, SEEDS);
  },
  async down(queryInterface, Sequelize) {},
};
