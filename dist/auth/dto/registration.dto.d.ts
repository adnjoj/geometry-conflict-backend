import { User } from 'src/users/entities/user.entity';
declare const RegistrationDto_base: import("@nestjs/mapped-types").MappedType<Pick<User, "username" | "password">>;
export declare class RegistrationDto extends RegistrationDto_base {
}
export {};
