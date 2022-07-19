import { WsResponse } from '@nestjs/websockets';

export class SuccessfullyJoinedLobbyWsResponse implements WsResponse {
  event = 'successfully_joined_lobby';

  constructor(public data: { token: string }) {}
}
