import { Optional, DataTypes, Sequelize } from "sequelize";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { dbNameTables } from "@src/shared/constants/db-name-tables";
import type { LeadStatus } from "@src/domain/entities/lead.entity.js";
import { Bisno } from "./bisno.model.js";
import { Mixeiro } from "./mixeiro.model.js";

interface LeadAttributes {
  id: string;
  bisnoId: string;
  mixeiroId: string;
  notifiedAt: Date | null;
  respondedAt: Date | null;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

type LeadCreationAttributes = Optional<
  LeadAttributes,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "notifiedAt"
  | "respondedAt"
  | "status"
>;

@Table({
  timestamps: false,
  underscored: true,
  tableName: dbNameTables.leads,
})
class Lead extends Model<LeadAttributes, LeadCreationAttributes> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
  })
  declare notifiedAt: Date | null;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
  })
  declare respondedAt: Date | null;

  @Column({
    allowNull: false,
    defaultValue: "sent",
    type: DataTypes.ENUM("sent", "accepted", "expired"),
  })
  declare status: LeadStatus;

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

  @ForeignKey(() => Bisno)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare bisnoId: string;

  @BelongsTo(() => Bisno)
  declare bisno: Bisno;

  @ForeignKey(() => Mixeiro)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare mixeiroId: string;

  @BelongsTo(() => Mixeiro)
  declare mixeiro: Mixeiro;
}

export { LeadAttributes, Lead };
