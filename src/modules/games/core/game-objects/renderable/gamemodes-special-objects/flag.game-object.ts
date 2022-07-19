import { Body, Bodies, Composite } from 'matter-js';

import { playerSize } from '../../../constants/player.constants';

import { Interactable } from 'src/modules/games/types/interactable.type';
import { Interactor } from '../../../interactor';
import { ImageObject } from '../image.game-object';

export class FlagObject extends ImageObject implements Interactable {
  public name = 'Флаг';
  public captureTime: number;
  public captureFraction: string;

  public readonly W = playerSize.w;
  public readonly H = playerSize.h;

  public interactor: Interactor;

  private _collider: any;

  public onCreate(): void {
    const x = this.transform.x;
    const y = this.transform.y;
    const w = this.W;
    const h = this.H;

    this._collider = Bodies.rectangle(x, y, w, h, {
      restitution: 0,
      friction: 0,
    });

    this.interactor = new Interactor(this, this._collider);
    Composite.add(this._game.world, [this._collider]);
  }

  public update(): void {
    super.update();
    Body.setPosition(this._collider, this.transform);
  }

  public destroy(): void {
    Composite.remove(this._game.world, this._collider);
    super.destroy();
  }
}
