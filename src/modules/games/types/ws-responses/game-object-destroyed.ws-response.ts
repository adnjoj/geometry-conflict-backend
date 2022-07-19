import type { WsResponse } from '@nestjs/websockets';
import type { RenderableGameObject } from '../../core/game-objects/renderable-game-object';

export class GameObjectDestroyedWsResponse implements WsResponse {
  event = 'game_object_destroyed';
  data: { id: number; time: number };

  constructor(gameObject: RenderableGameObject) {
    this.data = {
      id: gameObject.id,
      time: Date.now(),
    };
  }
}
