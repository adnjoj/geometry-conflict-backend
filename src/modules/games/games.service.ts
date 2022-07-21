import { Injectable } from '@nestjs/common';

import { Map as MapEntity } from '../maps/entities/map.entity';

import { GamesStore } from './stores/games.store';

import { Game } from './core/game/game';

import { PlayerInitialData } from './types/player-initial-data.type';

import { GamemodesResolver } from './core/resolvers/gamemodes.resolver';
import { GameObjectsResolver } from './core/resolvers/game-objects.resolver';
import { GameObjectsTransformer } from './core/transformers/game-objects.transformer';
import { MapsTransformer } from './core/transformers/maps.transformer';

@Injectable()
export class GamesService {
  constructor(private readonly gamesStore: GamesStore) {}

  get(gameId: number): Game {
    return this.gamesStore.get(gameId);
  }

  public create(map: MapEntity): Game {
    const mapsTransformer = new MapsTransformer(
      new GamemodesResolver(),
      new GameObjectsTransformer(new GameObjectsResolver()),
    );

    const game = mapsTransformer.toClass(map);
    game.eventsManager.addListener('finish', () => {
      this.gamesStore.delete(game.id);
    });

    this.gamesStore.add(game);

    return game;
  }

  public async addPlayer(
    gameId: number,
    user: PlayerInitialData,
  ): Promise<boolean> {
    return this.gamesStore.get(gameId)?.playersStore.add(user);
  }

  public start(gameId: number): void {
    const game = this.gamesStore.get(gameId);
    if (!game) return;
    if (game.playersStore.size <= 0) {
      this.gamesStore.delete(gameId);
      return game.stop();
    }

    game.start();
  }

  public delete(gameId: number): void {
    const game = this.gamesStore.get(gameId);
    if (!game) return;

    this.gamesStore.delete(game.id);
    game.stop();
  }
}
