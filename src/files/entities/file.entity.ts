import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original_name: string;

  @Column()
  size: string;

  @Column()
  full_name: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @Column()
  deleted_at: Date;
}
