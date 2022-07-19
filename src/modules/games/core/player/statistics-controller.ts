export class StatisicsController {
  private _kills = 0;
  private _damageDealt = 0;
  private _damageTaken = 0;

  public get kills(): number {
    return this._kills;
  }

  public get damageDealt(): number {
    return this._damageDealt;
  }

  public get damageTaken(): number {
    return this._damageTaken;
  }

  public incrementKills(): void {
    this._kills += 1;
  }

  public increaseDamageDealt(damage: number): void {
    this._damageDealt += damage;
  }

  public increaseDamageTaken(damage: number): void {
    this._damageTaken += damage;
  }
}
