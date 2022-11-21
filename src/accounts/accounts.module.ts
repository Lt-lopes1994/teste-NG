import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from 'src/transaction/transaction.module';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserSchema } from 'src/user/interface/user.schema';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TransactionSchema } from '../transaction/interface/transaction.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountSchema } from './interface/accountSchema.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountSchema, UserSchema, TransactionSchema]),
    UserModule,
    TransactionModule,
  ],
  providers: [AccountsService, UserService, TransactionService],
  controllers: [AccountsController],
  exports: [TypeOrmModule, AccountsService],
})
export class AccountsModule {}
