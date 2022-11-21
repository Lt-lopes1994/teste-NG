import { Account } from 'src/accounts/dtos/createAccount.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.id)
  debitedAccount: Account['id'];

  @ManyToOne(() => Account, (account) => account.id)
  creditedAccount: Account['id'];
}
