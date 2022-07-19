import { Player } from './player';

export class HpController {
  private _hp = 100;

  constructor(private readonly _owner: Player) {}

  public onDeath: () => void | any;

  public get hp(): number {
    return this._hp;
  }

  public getDamage(damage: number, enemy: Player): void {
    this._hp -= damage;

    enemy.statisticsController.increaseDamageDealt(damage);
    this._owner.statisticsController.increaseDamageTaken(damage);

    if (this._hp <= 0) this.die(enemy);
  }

  private die(killer: Player): void {
    killer.statisticsController.incrementKills();
    this.onDeath();
  }
}
