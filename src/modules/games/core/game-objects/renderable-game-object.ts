import { DataToRender } from '../../types/data-to-render/data-to-render.type';
import { GameObject } from './game-object';

export abstract class RenderableGameObject extends GameObject {
  public z = 0;
  public flip = { x: false, y: false };

  protected _previousState: any;

  constructor() {
    super();
    this.updatePreviousState();
  }

  protected updatePreviousState(): void {
    this._previousState = {
      x: this.transform.x,
      y: this.transform.y,
      z: this.z,
      flipX: this.flip.x,
      flipY: this.flip.y,
      angle: this.transform.angle,
    };
  }

  public shouldReRender(): boolean {
    const shouldReRender = Object.entries(this._previousState).reduce(
      (previousValue, [property, value]) => {
        return previousValue || this.transform[property] !== value;
      },
      false,
    );

    this.updatePreviousState();

    return shouldReRender;
  }

  public getDataToRender(): DataToRender {
    return {
      x: this.transform.x,
      y: this.transform.y,
      z: this.z,
      angle: this.transform.angle,
      flip: this.flip,
      src: '',
    };
  }
}
