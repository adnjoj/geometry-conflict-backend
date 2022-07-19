export class CollisionsObserver {
  public onCollisionStart(event: any): void {
    event.pairs.forEach((pair) => {
      pair?.bodyA?.onCollisionStart?.(pair.bodyB);
      pair?.bodyB?.onCollisionStart?.(pair.bodyA);
    });
  }

  public onCollisionEnd(event: any): void {
    event.pairs.forEach((pair) => {
      pair?.bodyA?.onCollisionEnd?.(pair.bodyB);
      pair?.bodyB?.onCollisionEnd?.(pair.bodyA);
    });
  }
}
