export class KeyboardController {
  private readonly _keysPressed = new Map<string, boolean>();
  private readonly _keysPressedOnce = new Map<string, boolean>();

  public updateKeysState(pressedKeys: string[]): void {
    pressedKeys.forEach((code) => {
      if (!this._keysPressed.get(code)) this._keysPressedOnce.set(code, true);
    });

    this._keysPressed.clear();
    pressedKeys.forEach((code) => this._keysPressed.set(code, true));
  }

  public isPressed(code: string): boolean {
    return this._keysPressed.get(code) ?? false;
  }

  public isPressedOnce(code: string): boolean {
    const value = this._keysPressedOnce.get(code);
    this._keysPressedOnce.set(code, false);
    return value;
  }
}
