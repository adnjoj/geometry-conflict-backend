import type { WsResponse } from '@nestjs/websockets';
import type { DataToRender } from '../data-to-render/data-to-render.type';

export class GameObjectsUpdatedWsResponse implements WsResponse {
  event = 'game_objects_updated';
  data: {
    updatedGameObjects: { id: number; renderData: DataToRender }[];
    time: number;
  };

  constructor(updatedGameObjects: { id: number; renderData: DataToRender }[]) {
    this.data = {
      updatedGameObjects,
      time: Date.now(),
    };
  }
}
