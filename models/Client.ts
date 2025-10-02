import {
  Table, Column, Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  static fillable = [
    'email',
    'password',
    'company',
    'totalLoginAttempt',
    'locked',
  ];

  @Column
    email!: string;

  @Column
    password!: string;

  @Column
    company!: string;

  @Column
    totalLoginAttempt!: number;

  @Column
    locked!: boolean;
}
