import { Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  async getAccounts() {
    return console.log('getAccounts');
  }

  @Post()
  async createNewAccount() {
    return await this.accountService.createNewAccount();
  }
}
