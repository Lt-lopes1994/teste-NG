import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionService } from 'src/transaction/transaction.service';
import { Repository } from 'typeorm';
import { Account } from './dtos/createAccount.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>, // private readonly transactionService: TransactionService,
  ) {}

  private readonly logger = new Logger(AccountsService.name);

  async createNewAccount(): Promise<Account> {
    const newAccount = this.accountRepository.create({
      balance: 10000,
    });

    return await this.accountRepository.save(newAccount);
  }

  // async cashOut(account: Account, value: number): Promise<Account> {
  //   const { balance } = account;

  //   if (balance < value) {
  //     throw new Error(`Saldo insuficiente.`);
  //   }

  //   const newBalance = balance - value;

  //   const updatedAccount = await this.accountRepository.save({
  //     ...account,
  //     balance: newBalance,
  //   });

  //   return updatedAccount;
  // }

  // async cashIn(account: Account, value: number): Promise<Account> {
  //   const { balance } = account;

  //   const newBalance = balance + value;

  //   const updatedAccount = await this.accountRepository.save({
  //     ...account,
  //     balance: newBalance,
  //   });

  //   return updatedAccount;
  // }

  // async findOneAccountById(id: number): Promise<Account> {
  //   return await this.accountRepository.findOneBy({ id });
  // }
}
