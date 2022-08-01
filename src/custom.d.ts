import type { User as UserEntity } from 'src/modules/users/entities/user.entity';

declare global {
  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserEntity {}
  }
}
