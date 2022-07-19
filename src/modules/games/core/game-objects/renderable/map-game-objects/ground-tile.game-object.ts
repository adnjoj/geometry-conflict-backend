import { SolidObject } from './solid.game-object';

export class GroundTile extends SolidObject {
  public static readonly typeName = 'GroundTile';

  public z = -100000;
}
