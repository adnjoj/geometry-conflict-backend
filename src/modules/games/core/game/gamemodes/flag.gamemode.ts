import type { Map as MapEntity } from 'src/modules/maps/entities/map.entity';

import { playerSize } from '../../constants/player.constants';
import { Fractions } from '../../constants/fractions.enum';

import { GameOverWsResponse } from 'src/modules/games/types/ws-responses/game-over.ws-response';

import { Game } from '../game';

import { FlagObject } from '../../game-objects/renderable/gamemodes-special-objects/flag.game-object';

export class FlagGamemode extends Game {
  public static readonly gamemodeName = 'Flag';
  public static readonly maxPlayersCount = 16;

  private readonly _flags = new Map<string, FlagObject>();

  private _winnerFraction: string;

  constructor(map: MapEntity) {
    super(map);
    this.initializeFlags();
  }

  public shouldFinish(): boolean {
    this._flags.forEach((flag, flagFraction) => {
      if (!flag.game) return;

      const fractionThatCapturedTheFlag = this.getFractionThatCapturedTheFlag(
        flagFraction,
        flag,
      );

      if (fractionThatCapturedTheFlag !== flag.captureFraction) {
        flag.captureTime = Date.now();
        flag.captureFraction = fractionThatCapturedTheFlag;
      }

      if (!fractionThatCapturedTheFlag) {
        flag.captureTime = undefined;
        flag.captureFraction = undefined;
      }

      if (Date.now() - flag.captureTime >= 30 * 1000) {
        this._winnerFraction = fractionThatCapturedTheFlag;
      }
    });

    return (
      Date.now() - this._startTime >= 15 * 60 * 1000 ||
      Boolean(this._winnerFraction)
    );
  }

  public finish(): void {
    const membersData = [];

    this.playersStore.forEach((player) => {
      if (player.fractionName === this._winnerFraction) {
        membersData.push({
          ...player.userData,
          statistics: {
            kills: player.statisticsController.kills,
            damageDealt: player.statisticsController.damageDealt,
            damageTaken: player.statisticsController.damageTaken,
          },
        });
      }
    });

    const response = new GameOverWsResponse(this._winnerFraction, membersData);
    this.broadcaster.broadcast(response);
  }

  private initializeFlags(): void {
    const defaultFlag = new FlagObject();

    const w = this._map.width / 2 - defaultFlag.W / 2;
    const h = this._map.height / 2 - defaultFlag.H / 2;

    const flagsData = {
      [Fractions.Square]: { position: { x: -w, y: -h }, color: 'red' },
      [Fractions.Circle]: { position: { x: w, y: -h }, color: 'magenta' },
      [Fractions.Star]: { position: { x: w, y: h }, color: 'yellow' },
      [Fractions.Triangle]: { position: { x: -w, y: h }, color: 'blue' },
    };

    Object.entries(flagsData).forEach(([fraction, { position, color }]) => {
      const flag = new FlagObject();
      flag.transform.setPosition(position.x, position.y);
      flag.setTexture(`flags/${color}/flagImage.png`);

      this._flags.set(fraction, flag);
      this.gameObjectsStore.add(flag);
    });
  }

  private getFractionThatCapturedTheFlag(
    flagFraction: string,
    flag: FlagObject,
  ): string {
    const w = this._map.width / 2;
    const h = this._map.height / 2;

    const zoneSize = playerSize.w * 10;
    const zones = {
      [Fractions.Square]: { center: { x: -w, y: -h }, size: zoneSize },
      [Fractions.Circle]: { center: { x: w, y: -h }, size: zoneSize },
      [Fractions.Star]: { center: { x: w, y: h }, size: zoneSize },
      [Fractions.Triangle]: { center: { x: -w, y: h }, size: zoneSize },
    };

    const { x: flagX, y: flagY } = flag.transform;
    let fractionThatCapturedTheFlag: string = undefined;

    Object.entries(zones).forEach(([zoneFraction, { center, size }]) => {
      const { x: zoneX, y: zoneY } = center;
      if (flagX <= zoneX - size / 2 || flagX >= zoneX + size / 2) return;
      if (flagY <= zoneY - size / 2 || flagY >= zoneY + size / 2) return;
      if (zoneFraction === flagFraction) return;

      fractionThatCapturedTheFlag = zoneFraction;
    });

    return fractionThatCapturedTheFlag;
  }
}
