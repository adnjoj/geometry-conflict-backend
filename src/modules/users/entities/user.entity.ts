import { Exclude } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  Entity,
  Column,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import {
  maxLengthValidationOptions,
  minLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Role } from '../../roles/entities/role.entity';
import { Fraction } from 'src/modules/fractions/entities/fraction.entity';
import { Speciality } from 'src/modules/specialities/entities/speciality.entity';
import { WeaponToUser } from './weapon-to-user.entity';
import { ClipToUser } from './clip-to-user.entity';
import { SkinToUser } from './skin-to-user.entity';
import { Map } from 'src/modules/maps/entities/map.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  @IsString(stringValidationOptions)
  @MinLength(1, maxLengthValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @IsString(stringValidationOptions)
  @MinLength(6, minLengthValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  password: string;

  @Exclude()
  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Fraction, { lazy: true, onDelete: 'SET NULL' })
  @JoinTable()
  fraction: Promise<Fraction>;

  @ManyToOne(() => Speciality, { lazy: true, onDelete: 'SET NULL' })
  @JoinTable()
  speciality: Promise<Speciality>;

  @OneToMany(() => SkinToUser, (skinToUser) => skinToUser.user, {
    lazy: true,
    cascade: true,
  })
  @JoinTable()
  skins: Promise<SkinToUser[]>;

  @OneToMany(() => WeaponToUser, (weaponToUser) => weaponToUser.user, {
    lazy: true,
    cascade: true,
  })
  @JoinTable()
  weapons: Promise<WeaponToUser[]>;

  @OneToMany(() => ClipToUser, (clipToUser) => clipToUser.user, {
    lazy: true,
    cascade: true,
  })
  @JoinTable()
  clips: Promise<ClipToUser[]>;

  @ManyToOne(() => Map, { onDelete: 'SET NULL', lazy: true })
  @JoinTable()
  map: Promise<Map>;
}
