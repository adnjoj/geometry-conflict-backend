import type { Weapon } from '../../weapons/weapon';

import { ImageObject } from './image.game-object';

export class PlayerWeaponObject extends ImageObject {
  constructor(weapon: Weapon) {
    super();
    this.setWeapon(weapon);
  }

  public setWeapon(weapon: Weapon): void {
    if (!weapon) return this.setTexture('empty');
    this.setTexture(`weapon-${weapon.weaponId}`);
  }

  public update(): void {
    return;
  }
}
