export enum CollisionCategories {
  Player = 0b1,
  PlayerBulletsCollider = 0b10,
  PlayerCollider = 0b100,
  Bullet = 0b1000,
  UnshootableBulletCollider = 0b10000,
  ShootableBulletCollider = 0b100000,
  Interactor = 0b1000000,
}
