import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];
}
