import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
