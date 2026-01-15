import {
  Table, Column, Model, ForeignKey, BelongsTo, HasMany,
} from 'sequelize-typescript';

import User from './User';
import PartnerDetailAccount from './PartnerDetailAccount';

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

  @HasMany(() => PartnerDetailAccount)
    partnerDetailAccounts!: PartnerDetailAccount[];
}
