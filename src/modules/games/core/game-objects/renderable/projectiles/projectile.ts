import { Body, Bodies, Composite } from 'matter-js';
import { Vector } from '../../../vector';

import { CollisionCategories } from '../../../constants/collision-categories.enum';

import { Player } from '../../../player/player';

import { ImageObject } from '../image.game-object';

export abstract class Projectile extends ImageObject {
  protected _owner: Player;

  protected _speed = 0;
  protected _maxDistance = 0;
  protected _damage = 0;

  protected _airFriction = 0;
  protected _direction = new Vector(0, 0); // normalized vector
  protected _collider: any;

  constructor(texture: string) {
    super();
    this.setTexture(texture);
  }

  public onCreate(): void {
    const { x, y } = this.transform;
    const w = 10;
    const h = 10;

    this._collider = Bodies.rectangle(x, y, w, h, {
      restitution: 0,
      friction: 0,
    });

    this._collider.collisionFilter.mask =
      CollisionCategories.PlayerBulletsCollider +
      CollisionCategories.UnshootableBulletCollider +
      CollisionCategories.ShootableBulletCollider;
    this._collider.collisionFilter.category = CollisionCategories.Bullet;

    Body.setInertia(this._collider, Infinity);
    Composite.add(this._game.world, [this._collider]);
  }

  public moveTo(x: number, y: number, speed: number, spread: number): void {
    const direction = new Vector(x - this.transform.x, y - this.transform.y);
    direction.normalize();
    direction.rotate(Math.random() * spread - spread / 2);

    this.transform.setAngle(direction.angle);

    this._speed = speed;
    this._direction = direction;
  }

  public setMaxDistance(maxDistance: number): void {
    this._maxDistance = maxDistance;
  }

  public setAirFriction(airFriction: number): void {
    this._airFriction = airFriction;
  }

  public setDamage(damage: number): void {
    this._damage = damage;
  }

  public setOwner(owner: Player): void {
    this._owner = owner;
  }

  public update(deltaTime: number): void {
    super.update();

    Body.setVelocity(this._collider, {
      x: this._direction.x * this._speed,
      y: this._direction.y * this._speed,
    });

    this.transform.setPosition(
      this._collider.position.x,
      this._collider.position.y,
    );

    this._speed -= this._airFriction * (deltaTime / 1000);
  }

  public destroy(): void {
    super.destroy();
    Composite.remove(this._game.world, this._collider);
  }
}
