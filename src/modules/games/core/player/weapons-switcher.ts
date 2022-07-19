import { WsResponse } from '@nestjs/websockets';

import { WeaponSwitchedWsResponse } from '../../types/ws-responses/weapon-switched.ws-response';

import { PlayerInventory } from './inventory/inventory';
import type { Weapon } from '../weapons/weapon';
import type { KeyboardController } from './keyboard-controller';

export class WeaponsSwitcher {
  private _selectedSlot = 0;

  constructor(
    private readonly _keyboardController: KeyboardController,
    private readonly _playerInventory: PlayerInventory,
    private readonly _broadcast: (response: WsResponse) => void,
  ) {}

  public get selectedWeaponSlot(): number {
    return this._selectedSlot;
  }

  public update(): void {
    for (let slot = 0; slot < PlayerInventory.weaponSlotsCount; slot += 1) {
      if (this._keyboardController.isPressedOnce(`Digit${slot + 1}`)) {
        this.selectWeapon(slot);
      }
    }
  }

  public selectWeapon(slot: number): void {
    const identifier = `weapon:${this._selectedSlot}`;
    const weapon = this._playerInventory.getItem(identifier)?.get() as Weapon;
    weapon?.stopReloading();

    this._selectedSlot = slot;

    if (this._selectedSlot >= PlayerInventory.weaponSlotsCount) {
      this._selectedSlot = PlayerInventory.weaponSlotsCount - 1;
    }

    if (this._selectedSlot < 0) {
      this._selectedSlot = 0;
    }

    const response = new WeaponSwitchedWsResponse(this._selectedSlot);
    this._broadcast(response);
  }

  public get selectedWeapon(): Weapon {
    const identifier = `weapon:${this._selectedSlot}`;
    return this._playerInventory.getItem(identifier)?.get() as Weapon;
  }
}
