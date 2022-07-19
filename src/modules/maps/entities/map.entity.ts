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
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OmitType, PickType } from '@nestjs/mapped-types';

import {
  arrayValidationOptions,
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  objectValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Gamemode } from 'src/modules/gamemodes/entities/gamemode.entity';
import { MapGameObject } from './map-game-object.entity';

@Entity('maps')
export class Map {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id: number;

  @Column({ unique: true, length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;

  @Column({ default: 0 })
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  width: number;

  @Column({ default: 0 })
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  height: number;

  @ManyToOne(() => Gamemode, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(Gamemode, ['id'] as const))
  @IsObject(objectValidationOptions)
  gamemode: Gamemode;

  @OneToMany(() => MapGameObject, (mapGameObject) => mapGameObject.map, {
    cascade: true,
  })
  @JoinTable()
  @Type(() => OmitType(MapGameObject, ['id'] as const))
  @IsArray(arrayValidationOptions)
  gameObjects: MapGameObject[];
}
