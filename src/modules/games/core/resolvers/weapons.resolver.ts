import type { Resolver } from '../../types/resolver.type';
import type { Weapon as WeaponEntity } from 'src/modules/weapons/entities/weapon.entity';
import type { Weapon } from '../weapons/weapon';

import { TommyGun } from '../weapons/tommy-gun';
import { Shotgun } from '../weapons/shotgun';
import { Pistol } from '../weapons/pistol';
import { Knife } from '../weapons/knife';

export class WeaponsResolver
  implements Resolver<new (weapon: WeaponEntity) => Weapon>
{
  private readonly _weapons = [TommyGun, Shotgun, Pistol, Knife];

  public resolve(weapon: WeaponEntity) {
    return this._weapons.find(
      ({ typeName }) => typeName === weapon?.type?.name,
    );
  }
}
