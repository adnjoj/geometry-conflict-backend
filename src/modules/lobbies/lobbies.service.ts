import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Game } from '../games/core/game/game';
import { Lobby } from './types/lobby.type';
import { Map as MapEntity } from '../maps/entities/map.entity';

import { LobbiesStore } from './stores/lobbies.store';

import { GamesService } from '../games/games.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LobbiesService {
  constructor(
    private readonly lobbiesStore: LobbiesStore,
    private readonly gamesService: GamesService,
    private readonly jwtService: JwtService,
  ) {}

  private gameToLobby({
    id,
    mapId,
    playersStore: { size: playersCount },
    maxPlayersCount,
  }: Game): Lobby {
    return { id, mapId, playersCount, maxPlayersCount };
  }

  start(lobbyId: number): void {
    this.gamesService.start(lobbyId);
    this.lobbiesStore.delete(lobbyId);
  }

  create(map: MapEntity): Lobby {
    const game = this.gamesService.create(map);
    const lobby = this.gameToLobby(game);

    setTimeout(() => this.start(game.id), 5 * 1000);

    this.lobbiesStore.add(lobby);

    return lobby;
  }

  getOne(lobbyId: number): Lobby {
    return this.lobbiesStore.getOne(lobbyId);
  }

  getAllForMap(mapId: number): Lobby[] {
    return Array.from(this.lobbiesStore.getAllForMap(mapId) ?? []);
  }

  addPlayerToLobby(lobbyId: number, user: User): boolean {
    const playerAdded = this.gamesService.addPlayer(lobbyId, user);

    if (playerAdded) {
      const lobby = this.lobbiesStore.getOne(lobbyId);
      lobby.playersCount += 1;

      if (lobby.playersCount >= lobby.maxPlayersCount) this.start(lobbyId);
    }

    return playerAdded;
  }

  generateToken(lobbyId: number, userId: number): string {
    return this.jwtService.sign({ lobbyId, userId });
  }
}
