import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ password, email }: AuthDto) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register({ email, fullName, password }: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(
        password,
        Number(process.env.SALT_OF_ROUND),
      );
      const user = await this.usersService.create({ email, hash, fullName });

      const payload = { id: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }
}
