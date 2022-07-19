import { KeyboardController } from './keyboard-controller';

export class MouseController {
  private readonly _position = { x: 0, y: 0 };
  private readonly _keysController = new KeyboardController();

  public get position() {
    return { ...this._position };
  }

  public updateState(state: {
    x: number;
    y: number;
    pressedButtons: string[];
  }): void {
    this._position.x = state.x;
    this._position.y = state.y;

    this._keysController.updateKeysState(state.pressedButtons);
  }

  public isPressed(code: string): boolean {
    return this._keysController.isPressed(code);
  }

  public isPressedOnce(code: string): boolean {
    return this._keysController.isPressedOnce(code);
  }
}
