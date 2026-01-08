import {
  Table, Column, Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'currencies',
  timestamps: true,
  paranoid: true,
})

export default class Country extends Model {
  static fillable: string[] = ['label', 'symbol'];

  @Column
    label!: string;

  @Column
    symbol!: string;
}
