import type { GameObject as GameObjectEntity } from 'src/modules/game-objects/entities/game-object.entity';
import type { MapGameObject } from 'src/modules/maps/entities/map-game-object.entity';

import { ImageObject } from '../image.game-object';

export class SolidObject extends ImageObject {
  public static readonly typeName: string = 'Solid';

  protected readonly _image: GameObjectEntity;

  constructor(initialData: MapGameObject) {
    super();

    this._image = initialData.image;
    this.transform.setPosition(initialData.x, initialData.y);

    this.setTexture(`game-objects/${this._image.id}/gameObjectImage.png`);
  }
}
