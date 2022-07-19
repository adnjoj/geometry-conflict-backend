import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, MaxLength, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { PickType } from '@nestjs/mapped-types';

import {
  arrayValidationOptions,
  intValidationOptions,
  maxLengthValidationOptions,
  minValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Map } from 'src/modules/maps/entities/map.entity';
import { GameObject } from 'src/modules/game-objects/entities/game-object.entity';
import { GameObjectType } from '../../game-object-types/entities/game-object-type.entity';

@Entity('maps_gameobjects')
@Tree('closure-table')
export class MapGameObject {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  id: number;

  @Column({ length: 50 })
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  x: number;

  @Column()
  @Type(() => Number)
  @IsInt(intValidationOptions)
  y: number;

  @ManyToOne(() => Map, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  @JoinTable()
  map: Map;

  @ManyToOne(() => GameObjectType, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(GameObjectType, ['id'] as const))
  type: GameObjectType;

  @ManyToOne(() => GameObject, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => PickType(GameObject, ['id'] as const))
  image: GameObject;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: MapGameObject;

  @TreeChildren({ cascade: true })
  @Type(() => MapGameObject)
  @IsArray(arrayValidationOptions)
  children: MapGameObject[];
}
