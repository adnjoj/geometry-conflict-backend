import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { Skin } from 'src/modules/skins/entities/skin.entity';

@Entity()
export class SkinToUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  user?: User;

  @ManyToOne(() => Skin, { eager: true, onDelete: 'CASCADE' })
  skin?: Skin;
}
