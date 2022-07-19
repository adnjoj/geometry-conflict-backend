import { CollisionCategories } from './constants/collision-categories.enum';

import type { GameObject } from './game-objects/game-object';
import type { InteractionHandler } from '../types/interaction-handler.type';
import type { Interactable } from '../types/interactable.type';

export class Interactor {
  private readonly _activeCollisions = new Map<number, any>();
  private readonly _handlers = new Map<new () => any, InteractionHandler>();

  public onIntersectionStart: (body: any) => void | any;
  public onIntersectionEnd: (body: any) => void | any;

  constructor(private readonly _gameObject: GameObject, _collider: any) {
    _collider.collisionFilter.mask = CollisionCategories.Interactor;
    _collider.collisionFilter.category = CollisionCategories.Interactor;
    _collider.isSensor = true;

    _collider.gameObject = _gameObject;

    _collider.onCollisionStart = (body: any) => {
      if (!body?.gameObject?.interactor) return;

      this._activeCollisions.set(body.id, body);
      this.onIntersectionStart?.(body);
    };

    _collider.onCollisionEnd = (body: any) => {
      if (this._activeCollisions.delete(body.id)) {
        this.onIntersectionEnd?.(body);
      }
    };
  }

  public invokeInteractionWith(objectId: number): void {
    const interactionBody = this._activeCollisions.get(objectId);
    if (!interactionBody?.gameObject?.interactor) return;

    const gameObject = interactionBody.gameObject as GameObject & Interactable;

    this.handleInteraction(gameObject);
    gameObject.interactor.handleInteraction(this._gameObject);
  }

  public handleInteraction(gameObject: GameObject): void {
    for (const [type, handler] of this._handlers.entries()) {
      if (gameObject instanceof type) {
        return handler(gameObject);
      }
    }
  }

  public onInteractionWith(
    type: new (...args: any[]) => any,
    handler: InteractionHandler,
  ): void {
    this._handlers.set(type, handler);
  }
}
