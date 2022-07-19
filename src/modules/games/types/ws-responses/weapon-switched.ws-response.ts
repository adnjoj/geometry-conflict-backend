import { WsResponse } from '@nestjs/websockets';

export class WeaponSwitchedWsResponse implements WsResponse {
  public event = 'weapon_switched';
  public data: { slot: number };

  constructor(slot: number) {
    this.data = { slot };
  }
}
