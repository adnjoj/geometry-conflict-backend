import { IsInt, IsNumber, IsString, Min, MaxLength } from 'class-validator';
import {
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  numberValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Clip } from 'src/clips/entities/clip.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { WeaponType } from './weapon-type.entity';
import { Type } from 'class-transformer';

@Entity('weapons')
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;

  @ManyToOne(() => WeaponType)
  type: WeaponType;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  damage: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  rateOfFire: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  spread: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  firingRange: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  reloadSpeed: number;

  @Column('double')
  @Type(() => Number)
  @IsNumber({}, numberValidationOptions)
  @Min(0, minValidationOptions)
  weight: number;

  @ManyToOne(() => Clip)
  clip: Clip;
}
