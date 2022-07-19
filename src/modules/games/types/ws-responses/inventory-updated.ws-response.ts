import { WsResponse } from '@nestjs/websockets';

export class InventoryUpdatedWsResponse implements WsResponse {
  public event = 'inventory_updated';

  constructor(
    public data: {
      [key: string]: Array<{ identifier: string; src: string; label: string }>;
    },
  ) {}
}
