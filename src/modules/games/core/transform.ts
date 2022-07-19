import { GameObject } from './game-objects/game-object';

// The game supports right rectangular coordinate system
export class Transform {
  private _x = 0;
  private _y = 0;
  private _angle = 0; // In degrees

  public readonly children = new Array<GameObject>();

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get angle() {
    return this._angle;
  }

  public addChild(child: GameObject) {
    this.children.push(child);
  }

  public setPosition(x: number, y: number): void {
    const motionX = x - this._x;
    const motionY = y - this._y;

    this.move(motionX, motionY);
  }

  public move(x: number, y: number): void {
    this._x += x;
    this._y += y;

    this.children.forEach((child) => child.transform.move(x, y));
  }

  public setAngle(angle: number): void {
    this._angle = angle;

    if (this._angle >= 360) this._angle = this._angle % 360;
    if (this._angle < 0) this._angle = 360 + (this._angle % 360);
  }

  public rotate(angle: number): void {
    this._angle += angle;

    if (this._angle >= 360) this._angle = this._angle % 360;
    if (this._angle < 0) this._angle = 360 + (this._angle % 360);
  }
}
