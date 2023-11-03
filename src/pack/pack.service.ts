import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackEntity } from 'src/pack/entities/pack.entity';
import { Repository } from 'typeorm';
// TODO сохронять фото кард в облаке
@Injectable()
export class PackService {
  constructor(
    @InjectRepository(PackEntity)
    private repository: Repository<PackEntity>,
  ) {}
  getPack() {
    const qb = this.repository.createQueryBuilder('file');

    return qb.getMany();
  }

  create(file: Express.Multer.File, title: string) {
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
