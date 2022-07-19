import { SolidObject } from './solid.game-object';

export class Ice extends SolidObject {
  public static readonly typeName = 'Ice';

  public z = -100000;
}
