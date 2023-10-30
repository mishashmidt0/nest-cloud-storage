import { Controller, Delete, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

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
  remove() {
    return this.appService.remove();
  }
}
