import { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';
import { Bullet } from '../game-objects/renderable/projectiles/bullet';
import { ImageUpdater } from './image-updaters/image-updater';
import { ShotgunImageUpdater } from './image-updaters/shotgun-image-updater';

import { Weapon } from './weapon';

export class Shotgun extends Weapon {
  public static readonly typeName = 'Shotgun';

  public imageUpdater: ImageUpdater = new ShotgunImageUpdater(this);

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
    const bulletTexture = `weapon-${this.weaponId}-bullet`;

    for (let i = 0; i < 10; i += 1) {
      const bullet = new Bullet(bulletTexture);
      super.initializeProjectile(bullet, x, y);
    }

    this._previousShotTime = Date.now();
    this.clip?.decrement();
  }
}
