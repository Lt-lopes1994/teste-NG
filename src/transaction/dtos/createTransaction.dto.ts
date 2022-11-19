import { Account } from 'src/accounts/dtos/createAccount.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Account)
  @JoinColumn()
  debitedAccount: Account['id'];

  @OneToOne(() => Account)
  @JoinColumn()
  creditedAccount: number;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
