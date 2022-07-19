import { WsResponse } from '@nestjs/websockets';

export class AvailableInteractionsWsResponse implements WsResponse {
  public event = 'available_interactions';
  public data: { availableInteractions: { id: number; name: string }[] };

  constructor(availableInteractions: { id: number; name: string }[]) {
    this.data = { availableInteractions };
  }
}
