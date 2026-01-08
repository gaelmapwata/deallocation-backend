import {
  Table, Column, Model, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import User from './User';

@Table({
  tableName: 'transactions',
  timestamps: true,
  paranoid: true,
})

export default class Transaction extends Model {
  // Propriétés fillable
  static fillable: string[] = [
    'msisdn',
    'customerName',
    'amount',
    'currency',
    'drAcctNum',
    'crAcctNum',
    'stan',
    'tranDateTime',
    'processingCode',
    'countryCode',
    'valueDate',
    'reservedFld1',
    'error',
    'success',
    'errorFinacle',
    'errorAirtelMoney',
    'userId',
  ];

  @Column
    msisdn!: string;

  @Column
    customerName!: string;

  @Column
    amount!: number;

  @Column
    currency!: string;

  @Column
    stan!: string;

  @Column
    tranDateTime!: string;

  @Column
    errorFinacle!: string;

  @Column
    errorAirtelMoney!: string;

  @Column
    error!: string;

  @Column
    success!: boolean;

  @Column
    drAcctNum!: string;

  @Column
    crAcctNum!: string;

  @ForeignKey(() => User)
  @Column
    userId!: number;

  @BelongsTo(() => User)
    user!: User;
}
