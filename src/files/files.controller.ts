import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserIdDecorator } from 'src/decorators/user-id.decorator';
import { FileType } from './enum';

@Controller('files')
@ApiTags('files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Get()
  findAll(
    @UserIdDecorator() userId: number,
    @Query('type') fileType: FileType,
  ) {
    return this.filesService.findAll(userId, fileType);
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @UserIdDecorator() userId: number,
  ) {
    return this.filesService.create(file, userId);
  }

  @Delete()
  remove(@UserIdDecorator() userId: number, @Query('ids') ids: string) {
    return this.filesService.remove(userId, ids);
  }
}
