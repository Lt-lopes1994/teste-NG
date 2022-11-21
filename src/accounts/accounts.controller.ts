import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/dtos/createUser.dto';
import { UserService } from 'src/user/user.service';
import { AccountsService } from './accounts.service';

@Controller('api/v1/accounts')
export class AccountsController {
  constructor(
    private readonly accountService: AccountsService,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

  @Get()
  async getAccounts() {
    return await this.accountService.getAccounts();
  }

  @Post()
  async createNewAccount() {
    return await this.accountService.createNewAccount();
  }

  @Put('/transactions')
  async createNewTransaction(@CurrentUser() user: User, @Body() body: any) {
    const { targetUserName, value } = body;
    const { id, userName } = user;

    if (targetUserName === '') {
      throw new Error('Nome de usuário é um campo obrigatório.');
    }

    if (value === '') {
      throw new Error('Valor é um campo obrigatório.');
    }

    const foundCashInUser = await this.userService.findUserByName(
      targetUserName,
    );

    if (!foundCashInUser) {
      throw new Error('Usuário para transferência não encontrado.');
    }

    const foundCashInAccount = await this.accountService.findOneAccountById(
      foundCashInUser.id,
    );

    if (!foundCashInAccount) {
      throw new Error('Conta para transferência não encontrada.');
    }

    const foundCashOutUser = await this.userService.findUserByName(userName);

    if (!foundCashOutUser) {
      throw new Error('Usuário para transferência não encontrado.');
    }

    const foundCashOutAccount = await this.accountService.findOneAccountById(
      foundCashOutUser.id,
    );

    if (!foundCashOutAccount) {
      throw new Error('Conta para retirada não encontrada.');
    }

    const debitedAccount = foundCashOutAccount.id;

    const creditedAccount = foundCashInAccount.id;

    if (debitedAccount === creditedAccount) {
      throw new Error('Não é possível transferir para a mesma conta.');
    }

    if (value > foundCashOutAccount.balance) {
      throw new Error('Saldo insuficiente.');
    }

    this.accountService.cashOut(debitedAccount, value);

    this.accountService.cashIn(creditedAccount, value);

    const transaction = await this.transactionService.createNewTransaction(
      value,
      debitedAccount,
      creditedAccount,
    );

    return transaction;
  }
}
