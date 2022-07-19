import { Clip } from '../../clips/clip';
import { Weapon } from '../../weapons/weapon';
import { FlagObject } from '../../game-objects/renderable/gamemodes-special-objects/flag.game-object';

import type { GameBroadcaster } from '../../game/game-broadcaster';
import type { GameObjectsStore } from '../../game/game-objects-store';
import type { Transform } from '../../transform';

import { InventoryItem } from './inventory-items/inventory-item';
import { InventoryObserver } from './inventory-observer';
import { InventoryUpdatesBroadcaster } from './inventory-updates-broadcaster';
import { InventoryItemsSerializer } from './inventory-items-serializer';

export class PlayerInventory {
  public static readonly weaponSlotsCount = 3;
  public static readonly clipSlotsCount = 4;

  private readonly _weapons = new Map<number, InventoryItem<Weapon>>();
  private readonly _clips = new Map<number, InventoryItem<Clip>>();
  private readonly _flags = new Map<number, InventoryItem<FlagObject>>();
  private readonly _allItems = {
    weapons: this._weapons,
    clips: this._clips,
    flags: this._flags,
  };

  private readonly _observer: InventoryObserver;

  constructor(
    private readonly _ownerId: number,
    private readonly _playerTransform: Transform,
    private readonly _gameObjectsStore: GameObjectsStore,
    private readonly _broadcaster: GameBroadcaster,
  ) {
    const getAllItems = () => this._allItems;
    const broadcast = (response) =>
      this._broadcaster.broadcastTo(this._ownerId, response);

    const serializer = new InventoryItemsSerializer(this, getAllItems);
    const broadcaster = new InventoryUpdatesBroadcaster(serializer, broadcast);

    this._observer = new InventoryObserver(serializer, broadcaster);
  }

  public update(): void {
    this._observer.update();
  }

  public getIdentifier(item: InventoryItem<any>, key: number): string {
    if (item.get() instanceof Weapon) return `weapon:${key}`;
    if (item.get() instanceof Clip) return `clip:${key}`;
    if (item.get() instanceof FlagObject) return `flag:${key}`;
    return '';
  }

  private resolveIdentifier(identifier: string): {
    map: Map<any, InventoryItem<any>>;
    key: any;
    value: InventoryItem<any>;
  } {
    const key = parseInt(identifier.split(':')[1], 10);
    let map: Map<any, InventoryItem<any>>;

    if (identifier.startsWith('weapon:')) map = this._weapons;
    if (identifier.startsWith('clip:')) map = this._clips;
    if (identifier.startsWith('flag:')) map = this._flags;

    const value = map.get(key);
    return { map, key, value };
  }

  private storeByIdentifier(
    identifier: string,
    item: InventoryItem<any>,
  ): void {
    const { map, key } = this.resolveIdentifier(identifier);
    map?.set(key, item);
  }

  public getItem(identifier: string): InventoryItem<any> {
    const { value: foundItem } = this.resolveIdentifier(identifier);
    return foundItem;
  }

  public takeItem(identifier: string, item: InventoryItem<any>): void {
    const { value: foundItem } = this.resolveIdentifier(identifier);

    if (!foundItem?.stackWith(item)) {
      this.dropItem(identifier);
      this.storeByIdentifier(identifier, item);
    }
  }

  public dropItem(identifier: string): void {
    const { value: item, map, key } = this.resolveIdentifier(identifier);

    const droppedItem = item?.drop();
    if (!droppedItem) return;

    map.delete(key);

    droppedItem.transform.setPosition(
      this._playerTransform.x,
      this._playerTransform.y,
    );

    this._gameObjectsStore.add(droppedItem);
  }

  public dropAllItems(): void {
    Object.entries(this._allItems).forEach(([, items]) =>
      items.forEach((item, key) =>
        this.dropItem(this.getIdentifier(item, key)),
      ),
    );
  }
}
