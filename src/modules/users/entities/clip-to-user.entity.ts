import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

import { User } from './user.entity';
import { Clip } from 'src/modules/clips/entities/clip.entity';

@Entity()
@Unique('unique_user_clip', ['user', 'clip'])
export class ClipToUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  user?: User;

  @ManyToOne(() => Clip, { eager: true, onDelete: 'CASCADE' })
  clip?: Clip;
}
