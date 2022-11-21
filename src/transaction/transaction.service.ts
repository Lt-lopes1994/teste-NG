import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Transaction } from './dtos/createTransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly userService: UserService,
    private readonly accountService: AccountsService,
  ) {}

  async createNewTransaction(
    value: number,
    debitedAccount: number,
    creditedAccount: number,
  ) {
    const newTransaction = this.transactionRepository.create({
      value,
      debitedAccount,
      creditedAccount,
    });

    await this.transactionRepository.save(newTransaction);

    return newTransaction;
  }

  async getCashOutTransactions(userId: number) {
    const foundUser = await this.userService.findOneUserById(userId);

    if (!foundUser) {
      throw new Error('Usuário não encontrado.');
    }

    const foundAccount = await this.accountService.findOneAccountById(userId);

    if (!foundAccount) {
      throw new Error('Conta não encontrada.');
    }

    const CashOutTransactions = await this.transactionRepository.find({
      where: {
        debitedAccount: foundAccount.id,
      },
    });

    return CashOutTransactions;
  }

  async getCashInTransactions(userId: number) {
    const foundUser = await this.userService.findOneUserById(userId);

    if (!foundUser) {
      throw new Error('Usuário não encontrado.');
    }

    const foundAccount = await this.accountService.findOneAccountById(userId);

    if (!foundAccount) {
      throw new Error('Conta não encontrada.');
    }

    const CashInTransactions = await this.transactionRepository.find({
      where: {
        creditedAccount: foundAccount.id,
      },
    });

    return CashInTransactions;
  }
}
