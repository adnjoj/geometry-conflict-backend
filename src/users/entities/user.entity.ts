import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Permission } from '../../permissions/entities/permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
