import { Controller, Delete, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { UserIdDecorator } from 'src/decorators/user-id.decorator';

@Controller('/api/chat')
@ApiTags('/api/chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async chat(@Res() res) {
    const messages = await this.appService.getMessages();
    res.json(messages);
  }

  @Delete()
  remove(@UserIdDecorator() userId: number, @Query('ids') ids: string) {
    return this.appService.remove(userId, ids);
  }
}
