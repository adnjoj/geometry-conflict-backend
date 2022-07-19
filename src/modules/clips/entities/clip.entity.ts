import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
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
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Speciality } from 'src/modules/specialities/entities/speciality.entity';

@Entity('clips')
export class Clip {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  bulletsAmount: number;

  @Column('double')
  @Type(() => Number)
  @IsNumber({}, numberValidationOptions)
  @Min(0, minValidationOptions)
  weight: number;

  @ManyToMany(() => Speciality, { eager: true })
  @JoinTable()
  @Type(() => PickType(Speciality, ['id'] as const))
  @IsArray(arrayValidationOptions)
  availableSpecialities: Speciality[];
}
