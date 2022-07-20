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
import { SkinTypesService } from '../skin-types/skin-types.service';
import { UsersService } from '../users/users.service';

import { GamemodesResolver } from '../games/core/resolvers/gamemodes.resolver';

import { AvailableLobbiesWsResponse } from './types/ws-responses/available-lobbies.ws-response';
import { FailedToJoinLobbyWsResponse } from './types/ws-responses/failed-to-join-lobby.ws-response';
import { SuccessfullyJoinedLobbyWsResponse } from './types/ws-responses/successfully-joined-lobby.ws-response';

@WebSocketGateway({ cors: true, namespace: 'lobbies' })
@UseGuards(WebsocketsJwtAuthGuard)
export class LobbiesGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly lobbiesService: LobbiesService,
    private readonly mapsService: MapsService,
    private readonly usersService: UsersService,
    private readonly skinTypesService: SkinTypesService,
  ) {}

  @SubscribeMessage('get_lobbies')
  async handleGetLobbiesRequest(
    client: Socket,
  ): Promise<AvailableLobbiesWsResponse> {
    const user = client.data.user as User;
    const mapId = (await user.map)?.id;
    const map = await this.mapsService.findOne({ id: mapId });

    if (!map) return;

    const lobbies = this.lobbiesService.getAllForMap(map.id);

    const data = lobbies.map((lobby) => ({ lobby, time: Date.now() }));
    const gamemodeResolver = new GamemodesResolver();

    data.push({
      lobby: {
        id: -1,
        mapId: map.id,
        playersCount: 0,
        maxPlayersCount: gamemodeResolver.resolve(map)?.maxPlayersCount,
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
    const mapId = (await user.map)?.id;
    const map = await this.mapsService.findOne({ id: mapId });

    if (!map) {
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

    const lobby =
      lobbyId === -1
        ? this.lobbiesService.create(map)
        : this.lobbiesService.getOne(lobbyId);

    if (!lobby) {
      return new FailedToJoinLobbyWsResponse({
        lobbyId,
        reason: 'Игра уже началась',
      });
    }

    const userData = (await this.usersService.findOne(
      { id: user.id },
      true,
    )) as any;
    const joinedLobby = await this.lobbiesService.addPlayerToLobby(lobby.id, {
      id: userData.id,
      username: userData.username,
      fraction: userData.__fraction__,
      speciality: userData.__speciality__,
      skins: userData.__skins__,
      weapons: userData.__weapons__,
      clips: userData.__clips__,
    });

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

    const skins = await this.usersService.loadSkins(user);

    skinTypes.forEach(({ id }) => {
      if (!skins.find(({ skin }) => skin.type.id === id)) {
        userHasAllSkins = false;
      }
    });

    return userHasAllSkins;
  }
}
