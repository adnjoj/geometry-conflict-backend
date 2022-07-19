import type { MapGameObject } from 'src/modules/maps/entities/map-game-object.entity';
import type { GameObject } from '../game-objects/game-object';
import type { Resolver } from '../../types/resolver.type';
import type { Transformer } from '../../types/transformer.type';

export class GameObjectsTransformer implements Transformer<GameObject> {
  constructor(
    private readonly _gameObjectsResolver: Resolver<
      new (gameObject: MapGameObject) => GameObject
    >,
  ) {}

  toClass(plain: MapGameObject): GameObject {
    const GameObjectClass = this._gameObjectsResolver.resolve(plain);
    if (!GameObjectClass) return null;
    return new GameObjectClass(plain);
  }
}
