import { Injectable } from '@nestjs/common';
import { SaveCreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  create(dto: SaveCreateUserDto) {
    return this.repository.save(dto);
  }
}
