import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PackService } from 'src/pack/pack.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePackDto } from 'src/pack/dto/create-pack.dto';
import { fileStorage } from 'src/files/storage';

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
    FileFieldsInterceptor([{ name: 'avatar' }, { name: 'title' }], {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePackDto,
  })
  create(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      title?: Express.Multer.File[];
    },
    @Body() { title }: CreatePackDto,
  ) {
    return this.packService.create(files.avatar?.[0], title);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.packService.remove(id);
  }
}
