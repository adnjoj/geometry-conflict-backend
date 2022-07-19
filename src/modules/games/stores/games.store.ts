import { Injectable } from '@nestjs/common';
import type { Game } from '../core/game/game';

@Injectable()
export class GamesStore {
  private readonly _games = new Map<number, Game>();

  public add(game: Game): void {
    this._games.set(game.id, game);
  }

  public get(gameId: number): Game {
    return this._games.get(gameId);
  }

  public delete(gameId: number): boolean {
    return this._games.delete(gameId);
  }
}
