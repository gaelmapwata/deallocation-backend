import {
  Table, Column, Model,
} from 'sequelize-typescript';
import { TokenTypeE } from '../types/Token';

@Table({
  tableName: 'blacklist_tokens',
  timestamps: true,
})

export default class BlacklistToken extends Model {
  @Column
    token!: string;

  @Column
    type!: TokenTypeE;
}
