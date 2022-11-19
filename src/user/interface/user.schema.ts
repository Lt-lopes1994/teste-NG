import { EntitySchema } from 'typeorm';
import { User } from '../dtos/createUser.dto';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    userName: {
      type: String,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    account: {
      type: 'one-to-one',
      target: 'Account',
      inverseSide: 'user',
      joinColumn: true,
      cascade: true,
      createForeignKeyConstraints: true,
    },
  },
});
