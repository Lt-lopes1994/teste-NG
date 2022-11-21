import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AccountsService } from 'src/accounts/accounts.service';
import { Repository } from 'typeorm';
import { User } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountsService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async createNewUser(user: User): Promise<User> {
    const { password, userName } = user;

    if (userName.length < 3) {
      throw new BadRequestException(
        `Nome de usuário deve ter no mínimo 3 caracteres.`,
      );
    }

    if (password.length < 8) {
      throw new BadRequestException(`Senha deve ter no mínimo 8 caracteres.`);
    }

    const isValidPassword = (password: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/i.test(
        password,
      );

    if (!isValidPassword(password)) {
      throw new BadRequestException(
        `Senha deve conter no mínimo uma letra maiúscula, um caractere especial e um número.`,
      );
    }

    const foundUser = await this.userRepository.findOneBy({ userName });

    if (foundUser) {
      throw new BadRequestException(`Esse nome ${userName} já existe.`);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...user,
      password: hashPassword,
    });

    await this.userRepository.save(newUser);

    const newAccount = await this.accountService.createNewAccount();

    const userWithAccount = this.userRepository.create({
      ...newUser,
      accountId: newAccount.id,
    });

    await this.userRepository.save(userWithAccount);

    return { ...userWithAccount, password: undefined };
  }

  async findAllUsers(): Promise<User[]> {
    const foundUsers = await this.userRepository.find();

    if (!foundUsers) {
      throw new BadRequestException(`Não há usuários cadastrados.`);
    }

    const returnUsers = foundUsers.map((user) => {
      delete user.password;
      return user;
    });

    return returnUsers;
  }

  async findOneUserById(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });

    console.log(id);

    if (!foundUser) {
      throw new BadRequestException(
        `Id ${id} não existe. Verifique a digitação.`,
      );
    }

    delete foundUser.password;

    return foundUser;
  }

  async findUserByName(userName: string) {
    const foundUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accountId', 'account.id')
      .where('user.userName = :userName', { userName })
      .getOne();

    return foundUser;
  }
}
