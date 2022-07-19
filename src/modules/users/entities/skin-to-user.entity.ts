import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';

import { User } from './user.entity';
import { Skin } from 'src/modules/skins/entities/skin.entity';

@Entity()
export class SkinToUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinTable()
  user: User;

  @ManyToOne(() => Skin, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  skin: Skin;
}
