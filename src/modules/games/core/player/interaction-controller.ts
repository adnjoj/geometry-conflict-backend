import { AvailableInteractionsWsResponse } from '../../types/ws-responses/available-interactions.ws-response';
import { DroppedClipObject } from '../game-objects/renderable/dropped-clip.game-object';
import { DroppedWeaponObject } from '../game-objects/renderable/dropped-weapon.game-object';
import { FlagObject } from '../game-objects/renderable/gamemodes-special-objects/flag.game-object';
import { GameBroadcaster } from '../game/game-broadcaster';
import { Interactor } from '../interactor';
import { PlayerInventory } from './inventory/inventory';
import { ClipInventoryItem } from './inventory/inventory-items/clip-inventory-item';
import { FlagInventoryItem } from './inventory/inventory-items/gamemodes-special-objects/flag-inventory-item';
import { WeaponInventoryItem } from './inventory/inventory-items/weapon-inventory-item';
import { Player } from './player';
import { WeaponsSwitcher } from './weapons-switcher';

export class InteractionController {
  private readonly _availableInteractions = new Map<
    number,
    { id: number; name: string }
  >();

  constructor(
    private readonly _ownerId: number,
    private readonly _owner: Player,
    private readonly _inventory: PlayerInventory,
    private readonly _weaponsSwitcher: WeaponsSwitcher,
    private readonly _broadcaster: GameBroadcaster,
    private readonly _interactor: Interactor,
  ) {
    this.initializeIntersectionEventsHandlers();
    this.initializeInteractions();
  }

  private broadcastAvailableInteractions(): void {
    const availableInteractions = [...this._availableInteractions.values()];

    const response = new AvailableInteractionsWsResponse(availableInteractions);
    this._broadcaster.broadcastTo(this._ownerId, response);
  }

  private initializeIntersectionEventsHandlers(): void {
    this._interactor.onIntersectionStart = (body) => {
      if (body.gameObject instanceof Player) return;

      this._availableInteractions.set(body.id, {
        id: body.id,
        name: body.gameObject.name,
      });
      this.broadcastAvailableInteractions();
    };

    this._interactor.onIntersectionEnd = (body) => {
      this._availableInteractions.delete(body.id);
      this.broadcastAvailableInteractions();
    };
  }

  private initializeInteractions(): void {
    this._interactor.onInteractionWith(
      DroppedClipObject,
      (droppedClip: DroppedClipObject) => {
        const { clip } = droppedClip;
        const clipInventoryItem = new ClipInventoryItem(clip);
        this._inventory.takeItem(`clip:${clip.clipId}`, clipInventoryItem);

        droppedClip.destroy();
      },
    );

    this._interactor.onInteractionWith(
      DroppedWeaponObject,
      (droppedWeapon: DroppedWeaponObject) => {
        const slot = this._weaponsSwitcher.selectedWeaponSlot;
        const { weapon } = droppedWeapon;
        weapon.setOwner(this._owner);

        const weaponInventoryItem = new WeaponInventoryItem(weapon);
        this._inventory.takeItem(`weapon:${slot}`, weaponInventoryItem);
        droppedWeapon.destroy();
      },
    );

    this._interactor.onInteractionWith(FlagObject, (flag: FlagObject) => {
      const flagInventoryItem = new FlagInventoryItem(flag);
      this._inventory.takeItem('flag:1', flagInventoryItem);
    });
  }
}
