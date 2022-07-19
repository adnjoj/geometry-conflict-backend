import { CollisionCategories } from '../../constants/collision-categories.enum';

import { PlayerCollider } from './player-collider.game-object';

export class ShootableBulletCollider extends PlayerCollider {
  public static readonly typeName: string = 'ShootableBulletCollider';

  onCreate(): void {
    super.onCreate();

    this._collider.gameObject = this;
    this._collider.collisionFilter.mask = CollisionCategories.Bullet;
    this._collider.collisionFilter.category =
      CollisionCategories.ShootableBulletCollider;
  }
}
