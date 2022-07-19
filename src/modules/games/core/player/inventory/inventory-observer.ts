import { InventoryItemsSerializer } from './inventory-items-serializer';
import { InventoryUpdatesBroadcaster } from './inventory-updates-broadcaster';

export class InventoryObserver {
  private _previousState = '';

  constructor(
    private readonly _inventoryItemsSerializer: InventoryItemsSerializer,
    private readonly _broadcaster: InventoryUpdatesBroadcaster,
  ) {}

  public update(): void {
    const items = this._inventoryItemsSerializer.serializeItems();
    const itemsStringified = JSON.stringify(items);

    if (this._previousState !== itemsStringified) {
      this._broadcaster.broadcast();
    }

    this._previousState = itemsStringified;
  }
}
