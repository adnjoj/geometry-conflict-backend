import { playerSize } from '../constants/player.constants';

import type { Clip } from '../clips/clip';
import type { Player } from '../player/player';
import type { ImageUpdater } from './image-updaters/image-updater';
import type { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';

import { Projectile } from '../game-objects/renderable/projectiles/projectile';

export abstract class Weapon {
  public readonly imageUpdater: ImageUpdater;

  protected _owner: Player;

  protected _reloading = false;
  protected _reloadingTimeout: NodeJS.Timer;

  protected _previousShotTime = 0;

  constructor(protected readonly _weaponData: WeaponEntity) {}

  public get weaponId(): number {
    return this._weaponData.id;
  }

  public get weaponName(): string {
    return this._weaponData.name;
  }

  public get damage(): number {
    return this._weaponData.damage;
  }

  public get firingRange(): number {
    return this._weaponData.firingRange * playerSize.w;
  }

  public get spread(): number {
    return this._weaponData.spread;
  }

  public get reloadingDuration(): number {
    return this._weaponData.reloadSpeed * 1000;
  }

  public get timeBetweenShots(): number {
    return (60 * 1000) / this._weaponData.rateOfFire;
  }

  public get clip(): Clip {
    return this._owner.inventory
      .getItem(`clip:${this._weaponData.clip.id}`)
      ?.get();
  }

  public get reloading(): boolean {
    return this._reloading;
  }

  public get previousShotTime(): number {
    return this._previousShotTime;
  }

  public setOwner(owner: Player): void {
    this._owner = owner;
  }

  public startReloading(): void {
    this.stopReloading();

    this._reloading = true;
    this._reloadingTimeout = setTimeout(() => {
      this.clip?.reload();
      this.stopReloading();
    }, this.reloadingDuration);
  }

  public stopReloading(): void {
    this._reloading = false;
    clearTimeout(this._reloadingTimeout);
  }

  public abstract shouldShoot(
    lmbPressed: boolean,
    lmbPressedOnce: boolean,
  ): boolean;

  protected initializeProjectile(
    projectile: Projectile,
    targetX: number,
    targetY: number,
  ): void {
    projectile.transform.setPosition(
      this._owner.transform.x,
      this._owner.transform.y + this._owner.H * 0.2,
    );

    const speed = 20;
    projectile.moveTo(targetX, targetY, speed, this.spread);
    projectile.setOwner(this._owner);
    projectile.setDamage(this.damage);
    projectile.setMaxDistance(this.firingRange);

    projectile.z = 3;

    this._owner.game.gameObjectsStore.add(projectile);
  }

  public abstract shootTo(x: number, y: number): void;
}
