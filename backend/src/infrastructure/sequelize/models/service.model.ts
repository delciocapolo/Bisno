import { Optional, DataTypes, Sequelize } from "sequelize";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { dbNameTables } from "@src/shared/constants/db-name-tables";
import { CategoryService } from "./category-service.model.js";

interface ServiceAttributes {
  id: number;
  categoryId: string;
  name: string;
  slug: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type ServiceCreationAttributes = Optional<
  ServiceAttributes,
  "id" | "isActive" | "createdAt" | "updatedAt"
>;

@Table({
  timestamps: false,
  underscored: true,
  tableName: dbNameTables.services,
})
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare icon: string;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  })
  declare createdAt: Date;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
  })
  declare updatedAt: Date | null;

  @ForeignKey(() => CategoryService)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare categoryId: string;

  @BelongsTo(() => CategoryService)
  declare categoryService: CategoryService;
}

export { Service, ServiceAttributes };
