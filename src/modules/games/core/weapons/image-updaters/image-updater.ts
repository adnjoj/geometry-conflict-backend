import { PlayerWeaponObject } from '../../game-objects/renderable/player-weapon.game-object';
import { Vector } from '../../vector';
import { Weapon } from '../weapon';

export abstract class ImageUpdater {
  constructor(protected readonly _weapon: Weapon) {}

  public abstract updateImage(
    image: PlayerWeaponObject,
    viewDirection: Vector,
  ): void;
}
