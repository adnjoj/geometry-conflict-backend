import { WsResponse } from '@nestjs/websockets';

export class PlayerIdWsResponse implements WsResponse {
  public event = 'player_id';
  public data: { id: number };

  constructor(id: number) {
    this.data = { id };
  }
}
