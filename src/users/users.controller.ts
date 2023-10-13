import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserIdDecorator } from 'src/decorators/user-id.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  getMe(@UserIdDecorator() id: number) {
    return this.usersService.findById(id);
  }
}
