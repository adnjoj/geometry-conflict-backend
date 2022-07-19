import sizeOf from 'image-size';
import { join } from 'path';

import { pathToStatic } from '../../constants/path-to-static';

import type { DataToRenderImage } from '../../../types/data-to-render/data-to-render-image.type';

import { RenderableGameObject } from '../renderable-game-object';

export class ImageObject extends RenderableGameObject {
  protected _size = { w: 0, h: 0 };

  protected _textureSrc = 'empty';

  public get texture(): string {
    return this._textureSrc;
  }

  public get size(): { w: number; h: number } {
    return { ...this._size };
  }

  public setTexture(texture: string): void {
    this._textureSrc = texture;
  }

  public async parseSize(): Promise<void> {
    if (this.texture !== 'empty') {
      try {
        const dimensions = await sizeOf(join(pathToStatic, '/', this.texture));
        this._size = { w: dimensions.width, h: dimensions.height };
      } catch (e) {
        console.log(e);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(deltaTime?: number): void {
    this.z = this.transform.y;
  }

  protected updatePreviousState(): void {
    super.updatePreviousState();
    this._previousState.textureSrc = this._textureSrc;
  }

  getDataToRender(): DataToRenderImage {
    return {
      ...super.getDataToRender(),
      src: this._textureSrc,
    };
  }
}
