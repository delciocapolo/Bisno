const { QueryInterface } = require("sequelize");

/**
 *
 * @param {QueryInterface} queryInterface
 * @param {string} tableName
 * @returns
 */
async function onUpdateRowTrigger(queryInterface, tableName) {
  await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // 2. Associar o trigger à tabela
  await queryInterface.sequelize.query(`
    CREATE TRIGGER set_updated_at_column
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);
}

/**
 *
 * @param {QueryInterface} queryInterface
 * @param {string} tableName
 * @returns
 */
async function onDownUpdateRowTrigger(queryInterface, tableName) {
  await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS set_updated_at_column ON ${tableName};
  `);
}

/**
 *
 * @param {QueryInterface} queryInterface
 * @param {string} tableName
 * @param {string} columnName
 * @returns
 */
async function onConstraintCheckNonNegativeInteger(
  queryInterface,
  tableName,
  columnName,
) {
  await queryInterface.sequelize.query(`
    ALTER TABLE ${tableName}
    ADD CONSTRAINT ${columnName}_non_negative
    CHECK (${columnName} >= 0);
  `);
}

/**
 *
 * @param {QueryInterface} queryInterface
 * @param {string} tableName
 * @param {string} columnName
 * @returns
 */
async function onDownConstraintCheckNonNegativeInteger(
  queryInterface,
  tableName,
  columnName,
) {
  await queryInterface.sequelize.query(`
    ALTER TABLE ${tableName}
    DROP CONSTRAINT IF EXISTS ${columnName}_non_negative;
  `);
}

module.exports = {
  onUpdateRowTrigger,
  onDownUpdateRowTrigger,
  onConstraintCheckNonNegativeInteger,
  onDownConstraintCheckNonNegativeInteger,
};
