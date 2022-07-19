import type { Game } from './game';
import type { GameObject } from '../game-objects/game-object';
import type { GameBroadcaster } from './game-broadcaster';

import { GameObjectCreatedWsResponse } from '../../types/ws-responses/game-object-created.ws-response';
import { GameObjectDestroyedWsResponse } from '../../types/ws-responses/game-object-destroyed.ws-response';
import { RenderableGameObject } from '../game-objects/renderable-game-object';
import { IdGenerator } from './id-generator';

export class GameObjectsStore {
  private readonly _idGenerator = new IdGenerator();
  private readonly _gameObjects = new Map<number, GameObject>();

  constructor(
    private readonly _game: Game,
    private readonly _broadcaster: GameBroadcaster,
  ) {}

  public iterate(callback: (gameObject: GameObject) => any): void {
    this._gameObjects.forEach(callback);
  }

  public add(gameObject: GameObject): GameObject {
    if (!gameObject) return null;

    gameObject.shouldDestroy = false;
    gameObject.setId(this._idGenerator.generateNext());
    gameObject.setGame(this._game);

    gameObject.onCreate();
    this._gameObjects.set(gameObject.id, gameObject);

    if (gameObject instanceof RenderableGameObject) {
      const response = new GameObjectCreatedWsResponse(gameObject);
      this._broadcaster.broadcast(response);
    }

    return gameObject;
  }

  public delete(gameObject: GameObject): boolean {
    if (!this._gameObjects.has(gameObject.id)) return false;

    if (gameObject instanceof RenderableGameObject) {
      const response = new GameObjectDestroyedWsResponse(gameObject);
      this._broadcaster.broadcast(response);
    }

    const { id } = gameObject;
    gameObject.clearId();
    gameObject.clearGame();

    return this._gameObjects.delete(id);
  }
}
