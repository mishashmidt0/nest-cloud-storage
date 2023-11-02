import {
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/files/storage';
import { CreatePackDto } from 'src/pack/dto/create-pack.dto';

@Controller('api/card')
@ApiTags('card')
@ApiBearerAuth()
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @Get()
  getPack() {
    return this.cardService.getPack();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePackDto,
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.cardService.create(file);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.cardService.remove(id);
  }
}
