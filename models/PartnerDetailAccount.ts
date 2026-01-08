import {
  Table, Column, Model, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import Currency from './Currency';
import PartnerDetail from './PartnerDetail';

@Table({
  tableName: 'partner_detail_accounts',
  timestamps: true,
  paranoid: true,
})
export default class PartnerDetailAccount extends Model {
  static fillable = [
    'accountNumber',
    'currencyId',
    'partnerDetailId',
  ];

  @Column
    accountNumber!: string;

  @ForeignKey(() => Currency)
  @Column
    currencyId!: number;

  @BelongsTo(() => Currency)
    currency!: Currency;

  @ForeignKey(() => PartnerDetail)
  @Column
    partnerDetailId!: number;

  @BelongsTo(() => PartnerDetail)
    partnerDetail!: PartnerDetail;
}
