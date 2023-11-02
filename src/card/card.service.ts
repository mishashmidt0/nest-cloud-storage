import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private repository: Repository<CardEntity>,
  ) {}
  getPack() {
    const qb = this.repository.createQueryBuilder('file');

    return qb.getMany();
  }

  create(file: Express.Multer.File) {
    return this.repository.save({
      filename: file.filename,
      name: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      url: `uploads/${file.filename}`,
    });
  }

  remove(id: string) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('id = :id', { id });
    return qb.softDelete().execute();
  }
}
