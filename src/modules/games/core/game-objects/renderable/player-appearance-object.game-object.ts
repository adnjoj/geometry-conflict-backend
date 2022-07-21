import type { Skin } from 'src/modules/skins/entities/skin.entity';

import { ImageObject } from './image.game-object';

export class PlayerAppearanceObject extends ImageObject {
  constructor(private readonly _skin: Skin) {
    super();

    this.setTexture(`skin-${this._skin.id}`);
  }

  public get skinId(): number {
    return this._skin.id;
  }

  public update(): void {
    return;
  }
}
