import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    default: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: '123',
  })
  password: string;
}
