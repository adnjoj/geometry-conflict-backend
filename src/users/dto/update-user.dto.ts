import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(
  OmitType(User, ['id'] as const),
) {}