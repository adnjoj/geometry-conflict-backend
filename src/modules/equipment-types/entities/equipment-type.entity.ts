import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString, MaxLength, Min } from 'class-validator';

import {
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

@Entity('equipment_types')
export class EquipmentType {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;
}
