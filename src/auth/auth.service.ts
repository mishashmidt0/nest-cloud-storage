import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ password, email }: AuthDto) {
    const user = await this.usersService.findByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      return await this.usersService.create(dto);
    } catch (e) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }
}
