import {
  Table, Column, Model, BelongsToMany,
} from 'sequelize-typescript';
import Role from './Role';
import UserRole from './UserRole';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  static fillable = ['firstName', 'lastName', 'email', 'username', 'password'];

  @Column
    email!: string;

  @Column
    username!: string;

  @Column
    firstName!: string;

  @Column
    lastName!: string;

  @Column
    password!: string;

  @Column
    locked!: boolean;

  @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];
}
