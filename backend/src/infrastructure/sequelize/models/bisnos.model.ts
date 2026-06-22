import { Optional, DataTypes, Sequelize } from 'sequelize';
import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { dbNameTables } from '@src/shared/constants/db-name-tables.js';
import { BisnoStatusType } from '@src/domain/entities/bisno.entity.js';
import { Zone } from './zone.model.js';
import { Service } from './service.model.js';

interface BisnoAttributes {
  id: number;
  zoneId: string;
  serviceId: string;
  customerName: string;
  customerMobile: string;
  customerMobileHasWhatsapp: boolean;
  description: string | null;
  status: BisnoStatusType;
  distributionRound: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface BisnoCreationAttributes extends Optional<BisnoAttributes, 'id'> {}

@Table({
  timestamps: false,
  underscored: true,
  tableName: dbNameTables.bisnos,
})
export class Bisno extends Model<BisnoAttributes, BisnoCreationAttributes> {
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
  declare customerName: string;

  @Column({
    type: DataTypes.STRING(15),
    allowNull: false,
  })
  declare customerMobile: string;

  @Column({
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  })
  declare customerMobileHasWhatsapp: boolean;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare description: string | null;

  @Column({
    type: DataTypes.ENUM("pending", "matched", "done", "exhausted"),
    defaultValue: "pending",
    allowNull: false,
  })
  declare status: BisnoStatusType;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
    allowNull: false,
  })
  declare distributionRound: number;

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

  @ForeignKey(() => Service)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare serviceId: string;

  @BelongsTo(() => Service)
  declare service: Service;
}
