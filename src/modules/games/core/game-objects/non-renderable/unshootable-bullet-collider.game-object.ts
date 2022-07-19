import { CollisionCategories } from '../../constants/collision-categories.enum';

import { ShootableBulletCollider } from './shootable-bullet-collider.game-object';

export class UnshootableBulletCollider extends ShootableBulletCollider {
  public static readonly typeName = 'UnshootableBulletCollider';

  onCreate(): void {
    super.onCreate();

    this._collider.gameObject = this;
    this._collider.collisionFilter.mask = CollisionCategories.Bullet;
    this._collider.collisionFilter.category =
      CollisionCategories.UnshootableBulletCollider;
  }
}
