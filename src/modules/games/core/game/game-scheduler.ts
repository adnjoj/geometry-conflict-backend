import { Game } from './game';

export class GameScheduler {
  private _timer: NodeJS.Timer;
  private _previousTickTime: number;
  private _stopped = false;

  constructor(private readonly game: Game) {}

  public start(updatesPerSecond: number): void {
    this.stop();
    this._stopped = false;

    this._previousTickTime = Date.now();
    const timeBetweenUpdates = 1000 / updatesPerSecond;

    let nextTickTime = Date.now();

    const update = () => {
      nextTickTime += timeBetweenUpdates;

      const now = Date.now();
      this.game.update(now - this._previousTickTime);
      this._previousTickTime = now;

      if (this._stopped) return;
      this._timer = setTimeout(update, nextTickTime - Date.now());
    };

    update();
  }

  public stop(): void {
    this._stopped = true;
    clearTimeout(this._timer);
  }
}
