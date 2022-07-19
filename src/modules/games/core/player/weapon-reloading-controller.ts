import type { Weapon } from '../weapons/weapon';
import type { KeyboardController } from './keyboard-controller';
import type { WeaponsSwitcher } from './weapons-switcher';

export class WeaponReloadingController {
  constructor(
    private readonly _weaponsSwitcher: WeaponsSwitcher,
    private readonly _keyboardController: KeyboardController,
  ) {}

  public update(): void {
    const weapon = this._weaponsSwitcher.selectedWeapon;
    if (this.shouldReload()) this.reload(weapon);
  }

  private shouldReload(): boolean {
    return this._keyboardController.isPressedOnce('KeyR');
  }

  private reload(weapon: Weapon): void {
    weapon?.startReloading();
  }
}
