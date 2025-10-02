import {
  Table, Column, Model, BelongsToMany, HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Role from './Role';
import Branch from './Branch';
import UserRole from './UserRole';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  static fillable = [
    'email',
    'totalLoginAttempt',
    'locked',

    'branchId',
  ];

  @Column
    email!: string;

  @Column
    totalLoginAttempt!: number;

  @Column
    locked!: boolean;

@ForeignKey(() => User)
  @Column
  validatedByUserId!: number;

  @ForeignKey(() => User)
  @Column
    validationAskedByUserId!: number;

  @ForeignKey(() => User)
  @Column
    createdByUserId!: number;

  @ForeignKey(() => User)
  @Column
    deletedByUserId!: number;

  @ForeignKey(() => Branch)
  @Column
    branchId!: number;

  @BelongsTo(() => Branch)
    branch!: Branch;

  @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];
}
