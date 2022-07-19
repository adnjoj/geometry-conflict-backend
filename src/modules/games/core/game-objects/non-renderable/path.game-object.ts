import type { MapGameObject } from 'src/modules/maps/entities/map-game-object.entity';

import { GameObject } from '../game-object';

export class Path extends GameObject {
  public static readonly typeName = 'Path';

  constructor(initialData: MapGameObject) {
    super();
  }

  public update(): void {
    return;
  }
}
