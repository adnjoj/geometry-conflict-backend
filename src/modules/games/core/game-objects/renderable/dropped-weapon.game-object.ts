import { Bodies, Composite } from 'matter-js';

import { playerSize } from '../../constants/player.constants';

import { Interactable } from 'src/modules/games/types/interactable.type';
import { Interactor } from '../../interactor';
import { ImageObject } from './image.game-object';
import { Weapon } from '../../weapons/weapon';

export class DroppedWeaponObject extends ImageObject implements Interactable {
  constructor(public readonly weapon: Weapon) {
    super();
    weapon.setOwner(null);
    this.name = weapon.weaponName;
    this.setTexture(`weapon-${weapon.weaponId}`);
  }

  public interactor: Interactor;

  private _collider: any;

  public onCreate(): void {
    const x = this.transform.x;
    const y = this.transform.y;
    const w = playerSize.w;
    const h = playerSize.h;

    this._collider = Bodies.rectangle(x, y, w, h, {
      restitution: 0,
      friction: 0,
    });

    this.interactor = new Interactor(this, this._collider);
    Composite.add(this._game.world, [this._collider]);
  }

  public destroy(): void {
    super.destroy();
    Composite.remove(this._game.world, this._collider);
  }
}
