import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsObject,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PickType } from '@nestjs/mapped-types';

import {
  arrayValidationOptions,
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  objectValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { SkinType } from 'src/modules/skin-types/entities/skin-type.entity';
import { Fraction } from 'src/modules/fractions/entities/fraction.entity';

@Entity('skins')
export class Skin {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id!: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name!: string;

  @ManyToOne(() => SkinType, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(SkinType, ['id'] as const))
  @IsObject(objectValidationOptions)
  type?: SkinType;

  @ManyToMany(() => Fraction, { eager: true })
  @JoinTable()
  @Type(() => PickType(Fraction, ['id'] as const))
  @IsArray(arrayValidationOptions)
  availableFractions!: Fraction[];
}
