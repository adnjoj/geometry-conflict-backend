import type { FlagObject } from '../../../../game-objects/renderable/gamemodes-special-objects/flag.game-object';

import { RenderableGameObject } from '../../../../game-objects/renderable-game-object';
import { InventoryItem } from '../inventory-item';

export class FlagInventoryItem extends InventoryItem<FlagObject> {
  constructor(flag: FlagObject) {
    super(flag);
    flag.destroy();
  }

  public get texture(): string {
    return this.get().texture;
  }

  public get label(): string {
    return '';
  }

  public stackWith(): boolean {
    return false;
  }

  drop(): RenderableGameObject {
    return this.get();
  }
}
