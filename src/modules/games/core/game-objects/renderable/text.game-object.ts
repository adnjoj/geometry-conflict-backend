import { DataToRenderImage } from 'src/modules/games/types/data-to-render/data-to-render-image.type';
import { DataToRenderText } from 'src/modules/games/types/data-to-render/data-to-render-text.type';

import { RenderableGameObject } from '../renderable-game-object';

export class TextObject extends RenderableGameObject {
  protected _fontFamily = 'Montserrat';
  protected _fontSize = 40;

  constructor(protected _text: string) {
    super();
  }

  public get text(): string {
    return this._text;
  }

  public get fontFamily(): string {
    return this._fontFamily;
  }

  public get fontSize(): number {
    return this._fontSize;
  }

  public setText(text: string): void {
    this._text = text;
  }

  public setFontFamily(fontFamily: string): void {
    this._fontFamily = fontFamily;
  }

  public setFontSize(fontSize: number): void {
    this._fontSize = fontSize;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_deltaTime?: number): void {
    this.z = this.transform.y;
  }

  protected updatePreviousState(): void {
    super.updatePreviousState();
    this._previousState.text = this._text;
  }

  getDataToRender(): DataToRenderText {
    const data = {
      ...(super.getDataToRender() as DataToRenderImage),
      text: this._text,
      fontFamily: this._fontFamily,
      fontSize: this._fontSize,
    };

    delete data.src;

    return data;
  }
}
