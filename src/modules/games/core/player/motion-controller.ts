import { Body } from 'matter-js';

import { Vector } from '../vector';
import { Player } from './player';

export class MotionController {
  private readonly DEFAULT_SPEED = 5;

  private _dashStartTime = 0;

  constructor(private readonly _player: Player) {}

  public get speed() {
    if (this._player.keyboardController.isPressedOnce('Space')) {
      this._dashStartTime = Date.now();
      return this.DEFAULT_SPEED * 4;
    }

    if (Date.now() - this._dashStartTime <= 200) {
      return this.DEFAULT_SPEED * 4;
    }

    if (this._player.keyboardController.isPressed('KeyC')) {
      return this.DEFAULT_SPEED / 2;
    }

    if (
      this._player.keyboardController.isPressed('ShiftLeft') ||
      this._player.keyboardController.isPressed('ShiftRight')
    ) {
      return this.DEFAULT_SPEED * 2;
    }

    return this.DEFAULT_SPEED;
  }

  public update(): void {
    const velocity = new Vector(0, 0);

    if (this._player.keyboardController.isPressed('KeyW')) velocity.y -= 1;
    if (this._player.keyboardController.isPressed('KeyS')) velocity.y += 1;
    if (this._player.keyboardController.isPressed('KeyA')) velocity.x -= 1;
    if (this._player.keyboardController.isPressed('KeyD')) velocity.x += 1;

    velocity.normalize();
    velocity.multiply(this.speed);

    Body.setVelocity(this._player.collider, velocity);

    this._player.transform.setPosition(
      this._player.collider.position.x,
      this._player.collider.position.y - 0.35 * this._player.H,
    );
  }
}
