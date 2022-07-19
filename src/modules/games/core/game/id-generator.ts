export class IdGenerator {
  private _intervalTimer: NodeJS.Timer;
  private _idGenerator: Generator<number>;

  constructor() {
    let i = 1;

    this._intervalTimer = setInterval(() => {
      if (i >= 100000) i = 1;
    }, 60 * 60 * 1000);

    this._idGenerator = (function* () {
      while (true) yield i++;
    })();
  }

  public generateNext(): number {
    return this._idGenerator?.next().value as number;
  }

  public destroy(): void {
    clearInterval(this._intervalTimer);
    this._idGenerator = null;
  }
}
