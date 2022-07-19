import type { Resolver } from '../../types/resolver.type';
import type { Transformer } from '../../types/transformer.type';
import type { Weapon } from '../weapons/weapon';
import type { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';

export class WeaponsTransformer implements Transformer<Weapon> {
  constructor(
    private readonly _weaponsResolver: Resolver<
      new (weapon: WeaponEntity) => Weapon
    >,
  ) {}

  toClass(plain: WeaponEntity): Weapon {
    const WeaponClass = this._weaponsResolver.resolve(plain);
    if (!WeaponClass) return null;
    return new WeaponClass(plain);
  }
}
