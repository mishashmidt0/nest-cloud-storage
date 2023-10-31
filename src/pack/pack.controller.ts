import {
  Body,
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
import { PackService } from 'src/pack/pack.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/files/storage';
import { CreatePackDto } from 'src/pack/dto/create-pack.dto';

@Controller('api/pack')
@ApiTags('pack')
@ApiBearerAuth()
export class PackController {
  constructor(private readonly packService: PackService) {}
  @Get()
  getPack() {
    return this.packService.getPack();
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
    return this.packService.create(file);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.packService.remove(id);
  }
}
