import { WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';

export class GameBroadcaster {
  private readonly _sockets = new Map<number, Socket>();
  private readonly _responses = new Array<WsResponse>();
  private readonly _personalResponses = new Map<number, Array<WsResponse>>();

  public addSocket(id: number, socket: Socket): void {
    this._sockets.set(id, socket);

    this._responses.forEach((response) => {
      socket.emit(response.event, response.data);
    });

    this._personalResponses.get(id)?.forEach((response) => {
      socket.emit(response.event, response.data);
    });
  }

  public broadcast(response: WsResponse): void {
    this._responses.push(response);

    for (const socket of this._sockets.values()) {
      socket.emit(response.event, response.data);
    }
  }

  public broadcastTo(socketId: number, response: WsResponse): void {
    if (!this._personalResponses.has(socketId)) {
      this._personalResponses.set(socketId, []);
    }

    this._personalResponses.get(socketId).push(response);

    this._sockets.get(socketId)?.emit(response.event, response.data);
  }
}
