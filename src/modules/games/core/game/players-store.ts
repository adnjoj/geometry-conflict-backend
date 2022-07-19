import type { GameObjectsStore } from './game-objects-store';
import type { User } from 'src/modules/users/entities/user.entity';

import { Fractions } from '../constants/fractions.enum';

import { Player } from '../player/player';

export class PlayersStore {
  private readonly _players = new Map<number, Player>();

  constructor(
    private readonly _maxPlayersCount: number,
    private readonly _gameObjectsStore: GameObjectsStore,
    private readonly _mapWidth: number,
    private readonly _mapHeight: number,
  ) {}

  public get(userId: number): Player {
    return this._players.get(userId);
  }

  public get size(): number {
    return this._players.size;
  }

  public add(user: User): boolean {
    if (this._players.size >= this._maxPlayersCount) return false;
    if (this._players.has(user.id)) return false;

    const player = new Player(user);
    this.initializePlayerPosition(player);

    this._gameObjectsStore.add(player);
    this._players.set(user.id, player);
    return true;
  }

  public delete(userId: number): boolean {
    const player = this._players.get(userId);
    if (!player) return false;

    const deletedFromGameObjects = this._gameObjectsStore.delete(player);
    const deletedFromPlayers = this._players.delete(userId);

    return deletedFromGameObjects && deletedFromPlayers;
  }

  public forEach(callback: (player: Player, id?: number) => any): void {
    this._players.forEach(callback);
  }

  private initializePlayerPosition(player: Player): void {
    const w = this._mapWidth / 2 - player.W / 2;
    const h = this._mapHeight / 2 - player.H / 2;

    const startPositions = {
      [Fractions.Square]: { x: -w, y: -h },
      [Fractions.Circle]: { x: w, y: -h },
      [Fractions.Star]: { x: w, y: h },
      [Fractions.Triangle]: { x: -w, y: h },
    };

    player.transform.setPosition(
      startPositions[player.fractionName]?.x ?? 0,
      startPositions[player.fractionName]?.y ?? 0,
    );
  }
}
