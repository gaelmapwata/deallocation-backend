import {
  Table, Column, Model, HasOne,
} from 'sequelize-typescript';

import FinacleTransaction from './FinacleTransaction';

@Table({
  tableName: 'transactions',
  timestamps: true,
  paranoid: true,
})

export default class Transaction extends Model {
  // Propriétés fillable
  static fillable: string[] = [
    'msisdn',
    'lastName',
    'firstName',
    'amount',
    'currency',
    'drAcctNum',
    'crAcctNum',
    'errorFinacle',
    'errorAirtelMoney',
  ];

  @Column
    msisdn!: string;

  @Column
    lastName!: string;

  @Column
    firstName!: string;

  @Column
    amount!: number;

  @Column
    currency!: string;

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

  @HasOne(() => FinacleTransaction)
    finacleTransaction!: FinacleTransaction;
}
