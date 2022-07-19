import { Type } from 'class-transformer';
import { IsInt, IsObject, IsString, MaxLength, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PickType } from '@nestjs/mapped-types';

import {
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  objectValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { GameObjectType } from 'src/modules/game-object-types/entities/game-object-type.entity';

@Entity('gameobjects')
export class GameObject {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;

  @ManyToOne(() => GameObjectType, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(GameObjectType, ['id'] as const))
  @IsObject(objectValidationOptions)
  type: GameObjectType;
}
