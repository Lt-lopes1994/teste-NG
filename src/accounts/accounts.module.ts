import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/user/interface/user.schema';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserService } from 'src/user/user.service';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountSchema } from './interface/accountSchema.schema';
import { TransactionSchema } from 'src/transaction/interface/transaction,schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountSchema, UserSchema, TransactionSchema]),
  ],
  providers: [AccountsService, UserService, TransactionService],
  controllers: [AccountsController],
  exports: [TypeOrmModule],
})
export class AccountsModule {}
