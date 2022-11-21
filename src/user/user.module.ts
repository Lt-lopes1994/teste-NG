import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema } from 'src/accounts/interface/accountSchema.schema';
import { UserSchema } from './interface/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema, AccountSchema]),
    TransactionModule,
  ],
  providers: [UserService, AccountsService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
