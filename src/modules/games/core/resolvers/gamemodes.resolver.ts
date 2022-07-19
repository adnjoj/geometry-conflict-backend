import type { Game } from '../game/game';
import type { Map } from 'src/modules/maps/entities/map.entity';
import type { Resolver } from '../../types/resolver.type';

import { FlagGamemode } from '../game/gamemodes/flag.gamemode';

export class GamemodesResolver implements Resolver<new (map: Map) => Game> {
  private readonly _gamemodes = [FlagGamemode];

  public resolve(map: Map) {
    return this._gamemodes.find(
      (gamemode) => gamemode.gamemodeName === map?.gamemode?.name,
    );
  }
}
