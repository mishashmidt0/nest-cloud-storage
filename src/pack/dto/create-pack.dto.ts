import { ApiProperty } from '@nestjs/swagger';

export class CreatePackDto {
  @ApiProperty()
  avatar: string;

  @ApiProperty({
    default: 'Name',
  })
  title: string;
}
