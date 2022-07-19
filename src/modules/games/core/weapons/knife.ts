import { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';
import { Clip } from '../clips/clip';
import { Bullet } from '../game-objects/renderable/projectiles/bullet';
import { ImageUpdater } from './image-updaters/image-updater';
import { KnifeImageUpdater } from './image-updaters/knife-image-updater';

import { Weapon } from './weapon';

export class Knife extends Weapon {
  public static readonly typeName = 'Knife';

  public imageUpdater: ImageUpdater = new KnifeImageUpdater(this);

  constructor(weaponData: WeaponEntity) {
    super(weaponData);
  }

  public shouldShoot(_lmbPressed: boolean, lmbPressedOnce: boolean): boolean {
    return (
      lmbPressedOnce &&
      Date.now() - this._previousShotTime >= this.timeBetweenShots
    );
  }

  public get clip(): Clip {
    return null;
  }

  public startReloading(): void {
    return;
  }

  public stopReloading(): void {
    return;
  }

  public shootTo(x: number, y: number): void {
    const bulletTexture = `weapons/${this.weaponId}/bulletImage.png`;
    const bullet = new Bullet(bulletTexture);

    super.initializeProjectile(bullet, x, y);

    this._previousShotTime = Date.now();
  }
}
