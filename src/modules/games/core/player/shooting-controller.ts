import type { Weapon } from '../weapons/weapon';
import type { MouseController } from './mouse-controller';
import type { WeaponsSwitcher } from './weapons-switcher';

export class ShootingController {
  private _lmbPressedOnce = false;

  constructor(
    private readonly _weaponsSwitcher: WeaponsSwitcher,
    private readonly _mouseController: MouseController,
  ) {}

  public update(): void {
    const weapon = this._weaponsSwitcher.selectedWeapon;
    if (this.shouldShoot(weapon)) this.shoot(weapon);
  }

  private shouldShoot(weapon: Weapon): boolean {
    const lmbPressed = this._mouseController.isPressed('LMB');
    const lmbPressedOnce = lmbPressed && this._lmbPressedOnce;

    this._lmbPressedOnce ||= this._mouseController.isPressedOnce('LMB');

    return weapon?.shouldShoot(lmbPressed, lmbPressedOnce);
  }

  private shoot(weapon: Weapon): void {
    this._lmbPressedOnce = false;

    weapon.shootTo(
      this._mouseController.position.x,
      this._mouseController.position.y,
    );
  }
}
