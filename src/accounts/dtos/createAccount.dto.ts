import { Transaction } from 'src/transaction/dtos/createTransaction.dto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  debitedTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  creditedTransactions: Transaction[];
}
