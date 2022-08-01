import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { Weapon } from 'src/modules/weapons/entities/weapon.entity';

@Entity()
export class WeaponToUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  slot!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  user?: User;

  @ManyToOne(() => Weapon, { eager: true, onDelete: 'CASCADE' })
  weapon?: Weapon;
}
