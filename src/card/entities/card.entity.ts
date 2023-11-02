import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  url: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
