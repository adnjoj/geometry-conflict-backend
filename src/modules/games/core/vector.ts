export class Vector {
  constructor(public x: number, public y: number) {}

  public static cloneVector(vector: Vector): Vector {
    return new Vector(vector.x, vector.y);
  }

  public get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public get angle(): number {
    const sin = this.y / this.length;
    const cos = this.x / this.length;

    let angle = (Math.asin(sin) * 180) / Math.PI;
    if (sin >= 0 && cos <= 0) angle = 180 - angle;
    else if (sin <= 0 && cos <= 0) angle = 180 - angle;
    else if (sin <= 0 && cos >= 0) angle += 360;

    return angle;
  }

  public normalize(): void {
    const length = this.length;
    this.x /= length || 1;
    this.y /= length || 1;
  }

  public multiply(multiplier: number): void {
    this.x *= multiplier;
    this.y *= multiplier;
  }

  public rotate(angle: number) {
    const radians = angle * (Math.PI / 180);

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    this.x = Math.round(10000 * (this.x * cos - this.y * sin)) / 10000;
    this.y = Math.round(10000 * (this.x * sin + this.y * cos)) / 10000;
  }
}
