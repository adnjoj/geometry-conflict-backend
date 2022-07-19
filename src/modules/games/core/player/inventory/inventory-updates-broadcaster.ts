import { WsResponse } from '@nestjs/websockets';
import { InventoryUpdatedWsResponse } from 'src/modules/games/types/ws-responses/inventory-updated.ws-response';
import { InventoryItemsSerializer } from './inventory-items-serializer';

export class InventoryUpdatesBroadcaster {
  constructor(
    private readonly _inventoryItemsSerializer: InventoryItemsSerializer,
    private readonly _broadcast: (response: WsResponse) => void | any,
  ) {}

  public broadcast(): void {
    const items = this._inventoryItemsSerializer.serializeItems();
    const response = new InventoryUpdatedWsResponse(items);
    this._broadcast(response);
  }
}
