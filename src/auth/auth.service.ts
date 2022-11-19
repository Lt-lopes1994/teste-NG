import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/dtos/createUser.dto';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/userToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(userName: string, password: string) {
    const user = await this.userService.findUserByName(userName);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        this.logger.log(`User ${userName} logged in.`);
        return { ...user, password: undefined };
      }
    }

    this.logger.log(`User ${userName} failed to log in.`);
    throw new Error('Usuário ou senha inválidos.');
  }

  login(user: User): UserToken {
    const payload: UserPayload = { sub: user.id, userName: user.userName };

    const jwtToken = this.jwtService.sign(payload);

    return { access_token: jwtToken };
  }
}
