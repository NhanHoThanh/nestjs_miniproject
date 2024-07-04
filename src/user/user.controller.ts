import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';

interface RequestWithUser extends Request {
  user: User;
}

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor() {}
  @Get('private')
  getMe(@GetUser() user: User) {
    return user;
  }
}
