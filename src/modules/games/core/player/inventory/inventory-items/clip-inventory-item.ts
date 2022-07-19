import type { Clip } from '../../../clips/clip';

import { DroppedClipObject } from '../../../game-objects/renderable/dropped-clip.game-object';
import { InventoryItem } from './inventory-item';

export class ClipInventoryItem extends InventoryItem<Clip> {
  public get texture(): string {
    return `clips/${this.get()?.clipId}/clipImage.png`;
  }

  public get label(): string {
    const bulletsCount = this.get()?.bullets;
    const bulletsInStockCount = this.get()?.bulletsInStock;
    return `${bulletsCount}/${bulletsInStockCount}`;
  }

  public stackWith(item: any): boolean {
    if (item instanceof ClipInventoryItem) {
      const bullets = item.get()?.bullets ?? 0;
      const bulletsInStock = item.get()?.bulletsInStock ?? 0;

      this.get()?.addBullets(bullets + bulletsInStock);
      return true;
    }

    return false;
  }

  public drop(): DroppedClipObject {
    return new DroppedClipObject(this.get());
  }
}
