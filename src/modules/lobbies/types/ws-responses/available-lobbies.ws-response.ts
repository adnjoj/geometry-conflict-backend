import { WsResponse } from '@nestjs/websockets';
import { Lobby } from '../lobby.type';

export class AvailableLobbiesWsResponse implements WsResponse {
  event = 'available_lobbies';

  constructor(public data: { lobby: Lobby; time: number }[]) {}
}
