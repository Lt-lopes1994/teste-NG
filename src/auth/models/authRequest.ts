import { Request } from 'express';
import { User } from 'src/user/dtos/createUser.dto';

export interface AuthRequest extends Request {
  user: User;
}
