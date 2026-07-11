import { Optional, DataTypes, Sequelize } from "sequelize";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { dbNameTables } from "@src/shared/constants/db-name-tables";
import { MixeiroStatusType } from "@src/domain/entities/mixeiro.entity.js";
import { CategoryService } from "./category-service.model.js";
import { Zone } from "./zone.model.js";

interface MixeiroAttributes {
  id: number;
  categoryId: string;
  zoneId: string;
  customName: string;
  fullname: string | null;
  email: string;
  password: string;
  bi: string | null;
  mobile: string;
  hasWhatsapp: boolean;
  isActive: boolean;
  isLocked: boolean;
  channel: MixeiroStatusType;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

type MixeiroCreationAttributes = Optional<MixeiroAttributes, "id">;

@Table({
  timestamps: false,
  underscored: true,
  tableName: dbNameTables.mixeiros,
})
export class Mixeiro extends Model<
  MixeiroAttributes,
  MixeiroCreationAttributes
> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare customName: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare fullname: string | null;

  @Column({
    type: DataTypes.STRING,
    unique: "idxemail",
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare bi: string | null;

  @Column({
    type: DataTypes.STRING(15),
    unique: "idxmobile",
    allowNull: false,
  })
  declare mobile: string;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  declare hasWhatsapp: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  declare isActive: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  declare isLocked: boolean;

  @Column({
    type: DataTypes.ENUM("whatsapp", "mobile", "email"),
    defaultValue: "mobile",
    allowNull: false,
  })
  declare channel: string;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
  })
  declare verifiedAt: Date | null;

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

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
  })
  declare deletedAt: Date | null;

  @ForeignKey(() => Zone)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare zoneId: string;

  @BelongsTo(() => Zone)
  declare zone: Zone;

  @ForeignKey(() => CategoryService)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare categoryServiceId: string;

  @BelongsTo(() => CategoryService)
  declare categoryService: CategoryService;
}
