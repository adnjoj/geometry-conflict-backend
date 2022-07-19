import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import type { User } from '../users/entities/user.entity';
import type { Game } from './core/game/game';

import { WebsocketsJwtAuthGuard } from '../auth/guards/websockets-jwt-auth.guard';

import { TokenVerificationFailedWsResponse } from './types/ws-responses/token-verification-failed.ws-response';
import { TokenVerificationSucceededWsResponse } from './types/ws-responses/token-verification-succeeded.ws-response copy';

import { GamesService } from './games.service';

@WebSocketGateway(3001, { cors: true, namespace: 'game' })
export class GamesGateway {
  constructor(
    private readonly gamesService: GamesService,
    private readonly jwtService: JwtService,
  ) {}

  @SubscribeMessage('initialize')
  @UseGuards(WebsocketsJwtAuthGuard)
  handleInitialization(client: Socket, payload: { token: string }): WsResponse {
    const user = client.data.user as User;
    const failedResponse = new TokenVerificationFailedWsResponse();

    const token = payload?.token?.split?.(' ')?.[1];
    if (!token) return failedResponse;

    const { lobbyId } = this.jwtService.decode(token) as any;
    const game = this.gamesService.get(lobbyId);
    if (!game) return failedResponse;

    if (!game.playersStore.get(user.id)) return failedResponse;

    client.data.game = game;
    game.broadcaster.addSocket(user.id, client);

    return new TokenVerificationSucceededWsResponse();
  }

  @SubscribeMessage('pressed_keys')
  handlePressedKeys(client: Socket, payload: { pressedKeys: string[] }): void {
    const user = client.data.user as User;
    const game = client.data.game as Game;
    if (!user || !game) return;

    const player = game.playersStore.get(user.id);
    player?.keyboardController.updateKeysState(payload.pressedKeys);
  }

  @SubscribeMessage('mouse_state')
  handleMouseStateUpdate(
    client: Socket,
    payload: {
      mouseState: {
        x: number;
        y: number;
        pressedButtons: string[];
      };
    },
  ): void {
    const user = client.data.user as User;
    const game = client.data.game as Game;
    if (!user || !game) return;

    const player = game.playersStore.get(user.id);
    player?.mouseController.updateState(payload.mouseState);
  }

  @SubscribeMessage('drop_inventory_item')
  handleDropInventoryItem(
    client: Socket,
    payload: { identifier: string },
  ): void {
    const user = client.data.user as User;
    const game = client.data.game as Game;
    if (!user || !game) return;

    const player = game.playersStore.get(user.id);
    player?.inventory.dropItem(payload.identifier);
  }

  @SubscribeMessage('interaction')
  handleInteraction(client: Socket, payload: { objectId: number }): void {
    const user = client.data.user as User;
    const game = client.data.game as Game;
    if (!user || !game) return;

    const player = game.playersStore.get(user.id);
    player?.interactor.invokeInteractionWith(payload.objectId);
  }
}
