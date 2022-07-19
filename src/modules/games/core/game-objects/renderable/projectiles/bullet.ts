import { Player } from '../../../player/player';

import { ShootableBulletCollider } from '../../non-renderable/shootable-bullet-collider.game-object';
import { UnshootableBulletCollider } from '../../non-renderable/unshootable-bullet-collider.game-object';
import { Projectile } from './projectile';

export class Bullet extends Projectile {
  private _distancePassed = 0;

  public onCreate(): void {
    super.onCreate();

    this._collider.isSensor = true;

    this._collider.onCollisionStart = (body) => {
      if (body?.gameObject instanceof UnshootableBulletCollider) {
        return this.destroy();
      }

      if (body?.gameObject instanceof ShootableBulletCollider) {
        if (Math.random() < 0.8) this.destroy();
        return;
      }

      if (!(body?.gameObject instanceof Player)) return this.destroy();

      const player = body.gameObject;

      if (player.fractionName !== this._owner.fractionName) {
        player.hpController.getDamage(this._damage, this._owner);
        this.destroy();
      }
    };
  }

  public update(deltaTime: number): void {
    const xBeforeUpdate = this.transform.x;
    const yBeforeUpdate = this.transform.y;

    super.update(deltaTime);

    const xAfterUpdate = this.transform.x;
    const yAfterUpdate = this.transform.y;

    const motionX = xAfterUpdate - xBeforeUpdate;
    const motionY = yAfterUpdate - yBeforeUpdate;

    this._distancePassed += Math.sqrt(motionX * motionX + motionY * motionY);

    if (this._distancePassed >= this._maxDistance) {
      this.destroy();
    }
  }
}
