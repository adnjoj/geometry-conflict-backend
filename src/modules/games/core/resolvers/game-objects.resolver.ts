import type { GameObject } from '../game-objects/game-object';
import type { GameObject as GameObjectEntity } from 'src/modules/game-objects/entities/game-object.entity';
import type { Resolver } from '../../types/resolver.type';

import { SolidObject } from '../game-objects/renderable/map-game-objects/solid.game-object';
import { Bush } from '../game-objects/renderable/map-game-objects/bush.game-object';
import { GrassTile } from '../game-objects/renderable/map-game-objects/grass-tile.game-object';
import { GroundTile } from '../game-objects/renderable/map-game-objects/ground-tile.game-object';
import { Ice } from '../game-objects/renderable/map-game-objects/ice.game-object';
import { Sand } from '../game-objects/renderable/map-game-objects/sand.game-object';
import { PlayerCollider } from '../game-objects/non-renderable/player-collider.game-object';
import { UnshootableBulletCollider } from '../game-objects/non-renderable/unshootable-bullet-collider.game-object';
import { ShootableBulletCollider } from '../game-objects/non-renderable/shootable-bullet-collider.game-object';
import { Path } from '../game-objects/non-renderable/path.game-object';

export class GameObjectsResolver
  implements Resolver<new (gameObject: GameObjectEntity) => GameObject>
{
  private readonly _gameObjects = [
    SolidObject,
    Bush,
    GrassTile,
    GroundTile,
    Ice,
    Sand,
    PlayerCollider,
    UnshootableBulletCollider,
    ShootableBulletCollider,
    Path,
  ];

  public resolve(gameObject: GameObjectEntity) {
    return this._gameObjects.find(
      ({ typeName }) => typeName === gameObject?.type?.name,
    );
  }
}
