import { PlayerWeaponObject } from '../../game-objects/renderable/player-weapon.game-object';
import { Vector } from '../../vector';
import { ImageUpdater } from './image-updater';

export class KnifeImageUpdater extends ImageUpdater {
  public updateImage(image: PlayerWeaponObject, viewDirection: Vector): void {
    if (Date.now() - this._weapon.previousShotTime > 150) return;

    const viewDirectionClone = Vector.cloneVector(viewDirection);
    viewDirectionClone.normalize();
    viewDirectionClone.multiply(this._weapon.firingRange);

    image.transform.move(viewDirectionClone.x, viewDirectionClone.y);
  }
}
