import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: 'testTest',
  })
  fullName: string;

  @ApiProperty({
    default: '1234',
  })
  password: string;
}
