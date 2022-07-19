import { Injectable } from '@nestjs/common';

import type { Lobby } from '../types/lobby.type';

@Injectable()
export class LobbiesStore {
  private readonly _lobbies = new Map<number, Map<number, Lobby>>();
  private readonly _allLobbies = new Map<number, Lobby>();

  public add(lobby: Lobby): void {
    const { mapId } = lobby;
    if (!this._lobbies.has(mapId)) this._lobbies.set(mapId, new Map());

    this._allLobbies.set(lobby.id, lobby);
    this._lobbies.get(mapId).set(lobby.id, lobby);
  }

  public getOne(lobbyId: number): Lobby {
    return this._allLobbies.get(lobbyId);
  }

  public getAllForMap(mapId: number): IterableIterator<Lobby> | undefined {
    return this._lobbies.get(mapId)?.values();
  }

  public delete(lobbyId: number): boolean {
    const lobby = this._allLobbies.get(lobbyId);
    if (!lobby) return false;

    this._allLobbies.delete(lobbyId);
    return this._lobbies.get(lobby.mapId)?.delete(lobbyId) ?? false;
  }
}
