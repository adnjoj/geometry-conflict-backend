import { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';
import { Bullet } from '../game-objects/renderable/projectiles/bullet';
import { ImageUpdater } from './image-updaters/image-updater';
import { TommyGunImageUpdater } from './image-updaters/tommy-gun-image-updater';

import { Weapon } from './weapon';

export class TommyGun extends Weapon {
  public static readonly typeName = 'TommyGun';

  public imageUpdater: ImageUpdater = new TommyGunImageUpdater(this);

  constructor(weaponData: WeaponEntity) {
    super(weaponData);
  }

  public shouldShoot(lmbPressed: boolean): boolean {
    return (
      lmbPressed &&
      !this._reloading &&
      this.clip?.bullets > 0 &&
      Date.now() - this._previousShotTime >= this.timeBetweenShots
    );
  }

  public shootTo(x: number, y: number): void {
    const bulletTexture = `weapons/${this.weaponId}/bulletImage.png`;
    const bullet = new Bullet(bulletTexture);

    super.initializeProjectile(bullet, x, y);

    this._previousShotTime = Date.now();
    this.clip?.decrement();
  }
}
