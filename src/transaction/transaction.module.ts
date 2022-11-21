import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { AccountSchema } from 'src/accounts/interface/accountSchema.schema';
import { UserSchema } from 'src/user/interface/user.schema';
import { UserService } from 'src/user/user.service';
import { TransactionSchema } from '../transaction/interface/transaction.schema';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionSchema, AccountSchema, UserSchema]),
  ],
  providers: [TransactionService, AccountsService, UserService],
  controllers: [TransactionController],
  exports: [TypeOrmModule],
})
export class TransactionModule {}
