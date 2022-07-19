import { PlayerInventory } from './inventory';
import { InventoryItem } from './inventory-items/inventory-item';

export class InventoryItemsSerializer {
  constructor(
    private readonly _inventory: PlayerInventory,
    private readonly _getAllInventoryItems: () => {
      [key: string]: Map<number, InventoryItem<any>>;
    },
  ) {}

  public serializeItems(): {
    [key: string]: Array<{ identifier: string; src: string; label: string }>;
  } {
    const serializedItems = {};

    Object.entries(this._getAllInventoryItems()).forEach(
      ([category, items]) => {
        serializedItems[category] = [];

        items.forEach((item, key) => {
          serializedItems[category].push({
            identifier: this._inventory.getIdentifier(item, key),
            src: item.texture,
            label: item.label,
          });
        });
      },
    );

    return serializedItems;
  }
}
