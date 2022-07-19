import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  Unique,
} from 'typeorm';

import { User } from './user.entity';
import { Clip } from 'src/modules/clips/entities/clip.entity';

@Entity()
@Unique('unique_user_clip', ['user', 'clip'])
export class ClipToUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinTable()
  user: User;

  @ManyToOne(() => Clip, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  clip: Clip;
}
