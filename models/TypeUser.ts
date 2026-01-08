import {
  Table, Column, Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'type_users',
  timestamps: true,
  paranoid: true,
})

export default class TypeUser extends Model {
  static fillable: string[] = ['name'];

  @Column
    name!: string;
}
