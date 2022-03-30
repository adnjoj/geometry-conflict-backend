import { IsInt, MaxLength, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clips')
export class Clip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  @MaxLength(50)
  name: string;

  // TODO: messages file
  @Column()
  @IsInt({ message: '' })
  @Min(0, { message: '' })
  bulletsAmount: number;

  @Column()
  @IsInt({ message: '' })
  @Min(0, { message: '' })
  weight: number;
}
