import { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';
import { Bullet } from '../game-objects/renderable/projectiles/bullet';
import { ImageUpdater } from './image-updaters/image-updater';
import { PistolImageUpdater } from './image-updaters/pistol-image-updater';

import { Weapon } from './weapon';

export class Pistol extends Weapon {
  public static readonly typeName = 'Pistol';

  public imageUpdater: ImageUpdater = new PistolImageUpdater(this);

  constructor(weaponData: WeaponEntity) {
    super(weaponData);
  }

  public shouldShoot(_lmbPressed: boolean, lmbPressedOnce: boolean): boolean {
    return (
      lmbPressedOnce &&
      !this._reloading &&
      this.clip?.bullets > 0 &&
      Date.now() - this._previousShotTime >= this.timeBetweenShots
    );
  }

  public shootTo(x: number, y: number): void {
    const bulletTexture = `weapon-${this.weaponId}-bullet`;
    const bullet = new Bullet(bulletTexture);

    super.initializeProjectile(bullet, x, y);

    this._previousShotTime = Date.now();
    this.clip?.decrement();
  }
}
