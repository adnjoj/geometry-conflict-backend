import type { Skin } from 'src/modules/skins/entities/skin.entity';

import { ImageObject } from './image.game-object';

export class PlayerAppearanceObject extends ImageObject {
  constructor(private readonly _skin: Skin) {
    super();

    this.setTexture(`skins/${this._skin.id}/skinImage.png`);
  }

  public update(): void {
    return;
  }
}
