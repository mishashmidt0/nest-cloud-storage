import { ApiProperty } from '@nestjs/swagger';

export class CreatePackDto {
  @ApiProperty()
  file: string;

  @ApiProperty({
    default: 'Name',
  })
  name: string;
}
