"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const user_entity_1 = require("../../users/entities/user.entity");
class RegistrationDto extends (0, mapped_types_1.PickType)(user_entity_1.User, [
    'username',
    'password',
]) {
}
exports.RegistrationDto = RegistrationDto;
//# sourceMappingURL=registration.dto.js.map