import type { Game } from '../game/game';
import type { GameObject } from '../game-objects/game-object';
import type { Map } from 'src/modules/maps/entities/map.entity';
import type { MapGameObject } from 'src/modules/maps/entities/map-game-object.entity';
import type { Resolver } from '../../types/resolver.type';
import type { Transformer } from '../../types/transformer.type';

export class MapsTransformer implements Transformer<Game> {
  constructor(
    private readonly _gamemodeResolver: Resolver<new (map: Map) => Game>,
    private readonly _gameObjectsTransformer: Transformer<GameObject>,
  ) {}

  public toClass(map: Map): Game {
    const GamemodeClass = this._gamemodeResolver.resolve(map);
    if (!GamemodeClass) return null;

    const game = new GamemodeClass(map);
    const scene = map.gameObjects[0];

    const iterateGameObject = (gameObjectData: MapGameObject) => {
      const gameObject = this._gameObjectsTransformer.toClass(gameObjectData);
      if (gameObject) game.gameObjectsStore.add(gameObject);

      gameObjectData?.children?.forEach?.((child) => iterateGameObject(child));
    };

    iterateGameObject(scene);

    return game;
  }
}
