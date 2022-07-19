import type { WsResponse } from '@nestjs/websockets';
import type { RenderableGameObject } from '../../core/game-objects/renderable-game-object';
import type { DataToRender } from '../data-to-render/data-to-render.type';

export class GameObjectCreatedWsResponse implements WsResponse {
  event = 'game_object_created';
  data: { id: number; dataToRender: DataToRender; time: number };

  constructor(gameObject: RenderableGameObject) {
    this.data = {
      id: gameObject.id,
      dataToRender: gameObject.getDataToRender(),
      time: Date.now(),
    };
  }
}
