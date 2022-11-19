import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dtos/createUser.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async createNewUser(@Body() user: User): Promise<User> {
    return await this.userService.createNewUser(user);
  }

  @Get()
  async getLoggedUser(@CurrentUser() user: User) {
    const { id, userName } = user;

    const loggedUser = await this.userService.findUserByName(userName);

    return { ...loggedUser, password: undefined };
  }
}
