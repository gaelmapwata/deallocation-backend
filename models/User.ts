import {
  Table, Column, Model, BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Role from './Role';
import Branch from './Branch';
import UserRole from './UserRole';
import TypeUser from './TypeUser';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  static fillable = [
    'email',
    'password',
    'totalLoginAttempt',
    'locked',
    'createdByUserId',
    'deletedByUserId',
    'validationAskedByUserId',
    'validatedByUserId',
    'branchId',
    'typeUserId',
    'isPartner',
  ];

  @Column
    email!: string;

  @Column
    password!: string;

  @Column
    totalLoginAttempt!: number;

  @Column
    locked!: boolean;

  @Column
    isPartner!: boolean;

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

  @ForeignKey(() => TypeUser)
  @Column
    typeUserId!: number;

  @BelongsTo(() => Branch)
    branch!: Branch;

  @BelongsTo(() => TypeUser)
    typeUser!: TypeUser;

  @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];
}
