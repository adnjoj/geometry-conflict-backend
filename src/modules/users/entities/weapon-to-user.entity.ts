import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { User } from './user.entity';
import { Weapon } from 'src/modules/weapons/entities/weapon.entity';

@Entity()
export class WeaponToUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  slot: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinTable()
  user: User;

  @ManyToOne(() => Weapon, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  weapon: Weapon;
}
