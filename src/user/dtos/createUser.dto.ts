import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';
import { Account } from 'src/accounts/dtos/createAccount.dto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @Unique(['userName'])
  userName: string;

  @Column()
  @IsNotEmpty()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @IsAlphanumeric()
  password: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account['id'];
}
