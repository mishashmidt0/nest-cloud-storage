import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  async createMessage(dto: ChatEntity): Promise<ChatEntity> {
    return await this.chatRepository.save(dto);
  }

  async getMessages(): Promise<ChatEntity[]> {
    return await this.chatRepository.find();
  }

  remove() {
    const qb = this.chatRepository.createQueryBuilder('chat');
    return qb.softDelete().execute();
  }
}
