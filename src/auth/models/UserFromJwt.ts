import { Account } from 'src/accounts/dtos/createAccount.dto';

export class UserFromJwt {
  id: number;
  userName: string;
  account: Account['id'];
}
