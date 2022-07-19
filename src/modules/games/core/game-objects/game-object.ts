import type { Game } from '../game/game';

import { Transform } from '../transform';

export abstract class GameObject {
  public name = 'GameObject';

  protected _id: number;
  protected _game: Game;

  public static readonly typeName: string;

  public readonly transform = new Transform();

  public shouldDestroy = false;

  public get id(): number {
    return this._id;
  }

  public setId(id: number): void {
    if (this._id !== undefined) {
      throw new Error(`Id for object ${this._id} is already set`);
    }

    this._id = id;
  }

  public clearId(): void {
    this._id = undefined;
  }

  public get game(): Game {
    return this._game;
  }

  public setGame(game: Game) {
    if (this._game) {
      throw new Error(
        `Object with id ${this._id} is already attached to game ${this._game.id}`,
      );
    }

    this._game = game;
  }

  public clearGame(): void {
    this._game = undefined;
  }

  public onCreate(): any {
    return;
  }

  public destroy(): void {
    this.shouldDestroy = true;
    this.transform.children.forEach((child) => child.destroy());
  }

  public abstract update(deltaTime: number): void;
}
