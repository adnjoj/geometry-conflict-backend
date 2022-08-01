import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PickType } from '@nestjs/mapped-types';

import {
  arrayValidationOptions,
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  numberValidationOptions,
  objectValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Clip } from 'src/modules/clips/entities/clip.entity';
import { WeaponType } from 'src/modules/weapon-types/entities/weapon-type.entity';
import { Speciality } from 'src/modules/specialities/entities/speciality.entity';

@Entity('weapons')
export class Weapon {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id!: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name!: string;

  @ManyToOne(() => WeaponType, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(WeaponType, ['id'] as const))
  @IsObject(objectValidationOptions)
  type?: WeaponType;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  damage!: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  rateOfFire!: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  spread!: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  firingRange!: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  reloadSpeed!: number;

  @Column('double')
  @Type(() => Number)
  @IsNumber({}, numberValidationOptions)
  @Min(0, minValidationOptions)
  weight!: number;

  @ManyToOne(() => Clip, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(Clip, ['id'] as const))
  @IsObject(objectValidationOptions)
  clip?: Clip;

  @ManyToMany(() => Speciality, { eager: true })
  @JoinTable()
  @Type(() => PickType(Speciality, ['id'] as const))
  @IsArray(arrayValidationOptions)
  availableSpecialities!: Speciality[];
}
