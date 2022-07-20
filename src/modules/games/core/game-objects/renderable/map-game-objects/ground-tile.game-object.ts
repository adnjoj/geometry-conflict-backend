import { SolidObject } from './solid.game-object';

export class GroundTile extends SolidObject {
  public static readonly typeName = 'GroundTile';

  public z = -50000;

  public onCreate() {
    this.z *= this.id;
  }

  public update(): void {
    return;
  }
}
