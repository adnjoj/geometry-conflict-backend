import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weapon_types')
export class WeaponType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  ru: string;
}
