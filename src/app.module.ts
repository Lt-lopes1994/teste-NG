import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsService } from './accounts/accounts.service';
import { Account } from './accounts/dtos/createAccount.dto';
import { Transaction } from './transaction/dtos/createTransaction.dto';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionService } from './transaction/transaction.service';
import { User } from './user/dtos/createUser.dto';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lt_lopes1994',
      database: 'teste',
      entities: [User, Account, Transaction],
      synchronize: true,
    }),
    UserModule,
    AccountsModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [UserController, AccountsController, TransactionController],
  providers: [
    AccountsService,
    UserService,
    TransactionService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
