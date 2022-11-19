import { EntitySchema } from 'typeorm';
import { Transaction } from '../dtos/createTransaction.dto';

export const TransactionSchema = new EntitySchema<Transaction>({
  name: 'Transaction',
  target: Transaction,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    value: {
      type: Number,
      nullable: false,
    },
    createdAt: {
      type: Date,
      nullable: false,
    },
  },
});
