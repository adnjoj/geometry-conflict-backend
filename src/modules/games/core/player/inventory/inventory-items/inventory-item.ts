import { GameObject } from '../../../game-objects/game-object';

export abstract class InventoryItem<T> {
  constructor(protected readonly _item: T) {}

  public get(): T {
    return this._item;
  }

  public abstract get texture(): string;

  public abstract get label(): string;

  public abstract stackWith(item: any): boolean;

  public abstract drop(): GameObject;
}
