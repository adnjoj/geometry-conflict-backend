import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { User } from '../users/entities/user.entity';

import { WebsocketsJwtAuthGuard } from '../auth/guards/websockets-jwt-auth.guard';

import { LobbiesService } from './lobbies.service';
import { MapsService } from '../maps/maps.service';

import { GamemodesResolver } from '../games/core/resolvers/gamemodes.resolver';

import { AvailableLobbiesWsResponse } from './types/ws-responses/available-lobbies.ws-response';
import { FailedToJoinLobbyWsResponse } from './types/ws-responses/failed-to-join-lobby.ws-response';
import { SuccessfullyJoinedLobbyWsResponse } from './types/ws-responses/successfully-joined-lobby.ws-response';
import { SkinTypesService } from '../skin-types/skin-types.service';

@WebSocketGateway(3001, { cors: true, namespace: 'lobbies' })
@UseGuards(WebsocketsJwtAuthGuard)
export class LobbiesGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly lobbiesService: LobbiesService,
    private readonly mapsService: MapsService,
    private readonly skinTypesService: SkinTypesService,
  ) {}

  @SubscribeMessage('get_lobbies')
  async handleGetLobbiesRequest(
    client: Socket,
  ): Promise<AvailableLobbiesWsResponse> {
    const user = client.data.user as User;

    if (!user.map) return;

    const lobbies = this.lobbiesService.getAllForMap(user.map.id);

    const data = lobbies.map((lobby) => ({ lobby, time: Date.now() }));
    const gamemodeResolver = new GamemodesResolver();

    data.push({
      lobby: {
        id: -1,
        mapId: user.map.id,
        playersCount: 0,
        maxPlayersCount: gamemodeResolver.resolve(user.map)?.maxPlayersCount,
      },
      time: Date.now(),
    });

    return new AvailableLobbiesWsResponse(data);
  }

  @SubscribeMessage('join_lobby')
  async handleJoinLobbyRequest(
    client: Socket,
    { lobbyId }: { lobbyId: number },
  ): Promise<FailedToJoinLobbyWsResponse | SuccessfullyJoinedLobbyWsResponse> {
    const user = client.data.user as User;

    if (!user.map) {
      return new FailedToJoinLobbyWsResponse({
        lobbyId,
        reason: 'Выберите карту',
      });
    }

    if (!(await this.userHasAllSkinsSet(user))) {
      return new FailedToJoinLobbyWsResponse({
        lobbyId,
        reason: 'Выберите образ персонажа',
      });
    }

    user.map = await this.mapsService.findOne({ id: user.map.id });

    const lobby =
      lobbyId === -1
        ? this.lobbiesService.create(user.map)
        : this.lobbiesService.getOne(lobbyId);

    if (!lobby) {
      return new FailedToJoinLobbyWsResponse({
        lobbyId,
        reason: 'Игра уже началась',
      });
    }

    const joinedLobby = this.lobbiesService.addPlayerToLobby(lobby.id, user);

    this.server.emit(lobbyId === -1 ? 'lobby_created' : 'lobby_updated', {
      lobby: this.lobbiesService.getOne(lobby.id),
      time: Date.now(),
    });

    if (joinedLobby) {
      const token = this.lobbiesService.generateToken(lobby.id, user.id);
      return new SuccessfullyJoinedLobbyWsResponse({ token });
    }

    return new FailedToJoinLobbyWsResponse({
      lobbyId,
      reason: 'Игра уже началась',
    });
  }

  private async userHasAllSkinsSet(user: User): Promise<boolean> {
    const skinTypes = await this.skinTypesService.findAll();
    let userHasAllSkins = true;

    skinTypes.forEach(({ id }) => {
      if (!user.skins.find(({ skin }) => skin.type.id === id)) {
        userHasAllSkins = false;
      }
    });

    return userHasAllSkins;
  }
}
