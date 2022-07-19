import { WsResponse } from '@nestjs/websockets';

export class FailedToJoinLobbyWsResponse implements WsResponse {
  event = 'failed_to_join_lobby';

  constructor(public data: { lobbyId: number }) {}
}
