import { QueryInterface } from "sequelize";

export async function onUpdateRowTrigger(queryInterface: QueryInterface, tableName: string) {
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

export async function onDownUpdateRowTrigger(queryInterface: QueryInterface, tableName: string) {
  await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS set_updated_at_column ON ${tableName};
  `);
}
