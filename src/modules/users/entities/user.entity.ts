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
  id!: number;

  @Column({ length: 50, unique: true })
  @IsString(stringValidationOptions)
  @MinLength(1, minLengthValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  username!: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @IsString(stringValidationOptions)
  @MinLength(6, minLengthValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  password!: string;

  @Exclude()
  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles!: Role[];

  @ManyToOne(() => Fraction, { onDelete: 'SET NULL' })
  fraction!: Promise<Fraction | undefined>;

  @ManyToOne(() => Speciality, { onDelete: 'SET NULL' })
  speciality!: Promise<Speciality | undefined>;

  @OneToMany(() => SkinToUser, (skinToUser) => skinToUser.user, {
    cascade: true,
  })
  skins!: Promise<SkinToUser[]>;

  @OneToMany(() => WeaponToUser, (weaponToUser) => weaponToUser.user, {
    cascade: true,
  })
  weapons!: Promise<WeaponToUser[]>;

  @OneToMany(() => ClipToUser, (clipToUser) => clipToUser.user, {
    cascade: true,
  })
  clips!: Promise<ClipToUser[]>;

  @ManyToOne(() => Map, { onDelete: 'SET NULL' })
  map!: Promise<Map | undefined>;
}
