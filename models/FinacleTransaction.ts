import {
  Table, Column, Model, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import Transaction from './Transaction';

@Table({
  tableName: 'finacle_transactions',
  timestamps: true,
  paranoid: true,
})

export default class FinacleTransaction extends Model {
  // Propriétés fillable
  static fillable: string[] = [
    'stan',
    'tranDateTime',
    'tranAmt',
    'processingCode',
    'tranCrncyCode',
    'countryCode',
    'valueDate',
    'drAcctNum',
    'crAcctNum',
    'reservedFld1',
    'drAcctNo',
    'crAcctNo',
    'amount',
    'transactionId',
  ];

  @Column
    stan!: string;

@Column
  tranDateTime!: string;

@Column
  tranAmt!: number;

@Column
  processingCode!: number;

@Column
  tranCrncyCode!: string;

@Column
  countryCode!: string;

@Column
  valueDate!: Date;

@Column
  drAcctNum!: string;

@Column
  crAcctNum!: string;

@Column
  reservedFld1!: string;

@Column
  drAcctNo!: string;

@Column
  crAcctNo!: string;

@Column
  amount!: number;

@ForeignKey(() => Transaction)
@Column
  transactionId!: number;

@BelongsTo(() => Transaction)
  transaction!: Transaction;
}
