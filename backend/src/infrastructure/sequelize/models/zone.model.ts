import { Optional, DataTypes } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";
import { dbNameTables } from "@src/shared/constants/db-name-tables";

interface ZoneAttributes {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
}

type ZoneCreationAttributes = Optional<ZoneAttributes, "id">;

@Table({
  timestamps: false,
  underscored: true,
  tableName: dbNameTables.zones,
})
export class Zone extends Model<ZoneAttributes, ZoneCreationAttributes> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: "idxname",
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: "idxslug",
  })
  declare slug: string;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  declare isActive: boolean;
}
