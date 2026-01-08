import {
  Table, Column, Model, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import User from './User';

@Table({
  tableName: 'partner_details',
  timestamps: true,
  paranoid: true,
})
export default class PartnerDetail extends Model {
  static fillable = [
    'partnerName',
    'partnerAddress',
    'partnerPhone',
    'userId',
  ];

  @Column
    partnerName!: string;

  @Column
    partnerAddress!: string;

  @Column
    partnerPhone!: string;

  @ForeignKey(() => User)
  @Column
    userId!: number;

  @BelongsTo(() => User)
    user!: User;
}
