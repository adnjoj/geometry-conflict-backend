import { WsResponse } from '@nestjs/websockets';
import { User } from 'src/modules/users/entities/user.entity';

export class GameOverWsResponse implements WsResponse {
  public event = 'game_over';
  public data: {
    winnerFraction: string;
    membersData: Array<
      User & {
        statistics: { kills: number; damageDealt: number; damageTaken: number };
      }
    >;
  };

  constructor(
    winnerFraction: string,
    membersData: Array<
      User & {
        statistics: { kills: number; damageDealt: number; damageTaken: number };
      }
    >,
  ) {
    this.data = { winnerFraction, membersData };
  }
}
