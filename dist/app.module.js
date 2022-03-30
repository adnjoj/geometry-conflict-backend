"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const dotenv = require("dotenv");
dotenv.config();
const all_exceptions_filter_1 = require("./all-exceptions.filter");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const weapons_module_1 = require("./weapons/weapons.module");
const equipment_module_1 = require("./equipment/equipment.module");
const clips_module_1 = require("./clips/clips.module");
const maps_module_1 = require("./maps/maps.module");
const permissions_module_1 = require("./permissions/permissions.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                parser: nestjs_i18n_1.I18nJsonParser,
                parserOptions: {
                    path: (0, path_1.join)(__dirname, '/i18n/'),
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            weapons_module_1.WeaponsModule,
            equipment_module_1.EquipmentModule,
            clips_module_1.ClipsModule,
            maps_module_1.MapsModule,
            permissions_module_1.PermissionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map