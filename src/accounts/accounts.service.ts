import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Account } from './dtos/createAccount.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  private readonly logger = new Logger(AccountsService.name);

  async createNewAccount(): Promise<Account> {
    const newAccount = this.accountRepository.create({
      balance: 10000,
    });

    return await this.accountRepository.save(newAccount);
  }

  async findOneAccountById(id: number): Promise<Account> {
    return await this.accountRepository
      .createQueryBuilder('account')
      .where('account.id = :id', { id })
      .getOne();
  }

  async getAccounts(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async transactionCashInCashOut(
    accountId: number,
    cashIn: boolean,
    value: number,
  ): Promise<Account> {
    const account = await this.findOneAccountById(accountId);

    // const foundUser = this.userService.findOneUserById();

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    if (cashIn) {
      account.balance += value;
    } else {
      account.balance -= value;
    }

    return account;
  }

  async cashOut(accountId: number, value: number): Promise<Account> {
    const account = await this.findOneAccountById(accountId);

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    if (account.balance < value) {
      throw new BadRequestException('Saldo insuficiente.');
    }

    account.balance -= value;

    this.accountRepository.update(accountId, account);

    return account;
  }

  async cashIn(accountId: number, value: number): Promise<Account> {
    const account = await this.findOneAccountById(accountId);

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    account.balance += value;

    this.accountRepository.update(accountId, account);

    return account;
  }
}
