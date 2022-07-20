import { SolidObject } from './solid.game-object';

export class GrassTile extends SolidObject {
  public static readonly typeName = 'GrassTile';

  public z = -50000;

  public onCreate() {
    this.z *= this.id;
  }

  public update(): void {
    return;
  }
}
