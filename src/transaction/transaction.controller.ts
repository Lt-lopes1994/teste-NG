import { Controller, Get } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/dtos/createUser.dto';
import { UserService } from 'src/user/user.service';
import { TransactionService } from './transaction.service';

@Controller('api/v1/transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
    private readonly accountService: AccountsService,
  ) {}

  @Get()
  async getUserTransctions(@CurrentUser() user: User) {
    const { id } = user;

    const userCashOutTransaction =
      await this.transactionService.getCashOutTransactions(id);

    const userCashInTransaction =
      await this.transactionService.getCashInTransactions(id);

    if (
      userCashOutTransaction.length === 0 ||
      userCashInTransaction.length === 0
    ) {
      return JSON.stringify({
        message: `Não existem transações para esse usuário`,
      });
    }

    const userTransactions = {
      transacoes_enviadas: userCashOutTransaction,
      transacoes_recebidas: userCashInTransaction,
    };

    return userTransactions;
  }
}
