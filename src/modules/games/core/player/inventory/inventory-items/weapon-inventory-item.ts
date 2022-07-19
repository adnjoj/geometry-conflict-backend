import type { Weapon } from '../../../weapons/weapon';

import { DroppedWeaponObject } from '../../../game-objects/renderable/dropped-weapon.game-object';
import { InventoryItem } from './inventory-item';

export class WeaponInventoryItem extends InventoryItem<Weapon> {
  public get texture(): string {
    return `weapons/${this.get()?.weaponId}/weaponImage.png`;
  }

  public get label(): string {
    return '';
  }

  public stackWith(): boolean {
    return false;
  }

  public drop(): DroppedWeaponObject {
    return new DroppedWeaponObject(this.get());
  }
}
