import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { UserService } from 'src/user/user.service';
import { Transaction } from './dtos/createTransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly userService: UserService,
    private readonly accountService: AccountsService,
  ) {}

  // async createNewTransaction() {
  //   const user = await this.userService.findOneUserById(1);
  //   const account = await this.accountService.findOneAccountById(1);

  //   const transaction = new Transaction();
  // }
}
