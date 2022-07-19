import { Clip as ClipEntity } from 'src/modules/clips/entities/clip.entity';

export class Clip {
  private _bullets = 0;
  private _bulletsInStock = 0;

  constructor(private readonly _clipData: ClipEntity, amount: number) {
    this._bullets = _clipData.bulletsAmount;
    this._bulletsInStock = (amount - 1) * _clipData.bulletsAmount;
  }

  public get clipId(): number {
    return this._clipData.id;
  }

  public get clipName(): string {
    return this._clipData.name;
  }

  public get bullets(): number {
    return this._bullets;
  }

  public get bulletsInStock(): number {
    return this._bulletsInStock;
  }

  public decrement(): void {
    if (this._bullets > 0) this._bullets -= 1;
  }

  public addBullets(amount: number): void {
    this._bulletsInStock += amount;
  }

  public reload(): void {
    const bulletsNeeded = this._clipData.bulletsAmount - this._bullets;
    const bulletsToAdd = Math.min(this._bulletsInStock, bulletsNeeded);

    this._bullets += bulletsToAdd;
    this._bulletsInStock -= bulletsToAdd;
  }
}
