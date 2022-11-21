import { User } from 'src/user/dtos/createUser.dto';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  @OneToOne(() => User, (user) => user.accountId)
  id: number;

  @Column()
  balance: number;
}
