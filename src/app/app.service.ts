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

  async createMessage(chat: ChatEntity): Promise<ChatEntity> {
    return await this.chatRepository.save(chat);
  }

  async getMessages(): Promise<ChatEntity[]> {
    return await this.chatRepository.find();
  }

  remove(userId: number, ids: string) {
    const idsArray = ids.split(',');
    const qb = this.chatRepository.createQueryBuilder('chat');

    qb.where('id IN (:...ids) AND userId = :userId', { ids: idsArray, userId });
    return qb.softDelete().execute();
  }
}
