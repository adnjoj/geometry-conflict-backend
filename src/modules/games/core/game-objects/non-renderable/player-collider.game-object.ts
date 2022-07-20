import { Bodies, Composite } from 'matter-js';

import { CollisionCategories } from '../../constants/collision-categories.enum';

import type { MapGameObject } from 'src/modules/maps/entities/map-game-object.entity';

import { GameObject } from '../game-object';

export class PlayerCollider extends GameObject {
  public static readonly typeName: string = 'PlayerCollider';

  protected _collider: any;
  protected readonly _points: { x: number; y: number }[];

  constructor(initialData: MapGameObject) {
    super();

    this._points = initialData.children
      .filter((gameObject) => gameObject.type.name === 'Point')
      .map(({ x, y }) => ({ x, y }));
  }

  public onCreate(): void {
    if (this._points.length < 3) return;

    this._collider = Bodies.fromVertices(
      this._points.reduce((a, b) => a + b.x, 0) / this._points.length,
      this._points.reduce((a, b) => a + b.y, 0) / this._points.length,
      this._points,
      {
        isStatic: true,
        restitution: 0,
        friction: 0,
      },
    );

    this._collider.gameObject = this;
    this._collider.collisionFilter.mask = CollisionCategories.Player;
    this._collider.collisionFilter.category =
      CollisionCategories.PlayerCollider;

    Composite.add(this._game.world, [this._collider]);
  }

  public update(): void {
    return;
  }
}
