import { SolidObject } from './solid.game-object';

export class Sand extends SolidObject {
  public static readonly typeName = 'Sand';

  public z = -100000;
}
