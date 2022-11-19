import { EntitySchema } from 'typeorm';
import { Account } from '../dtos/createAccount.dto';

export const AccountSchema = new EntitySchema<Account>({
  name: 'Account',
  target: Account,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    balance: {
      type: Number,
    },
  },
});
