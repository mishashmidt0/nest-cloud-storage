import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test2@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: '1234',
  })
  password: string;
}
export class SaveCreateUserDto {
  @ApiProperty({
    default: 'test2@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: '1234',
  })
  hash: string;
}
