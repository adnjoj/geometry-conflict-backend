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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_i18n_1 = require("nestjs-i18n");
const dotenv = require("dotenv");
dotenv.config();
const constants_1 = require("./constants/constants");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const weapons_module_1 = require("./modules/weapons/weapons.module");
const casl_module_1 = require("./modules/casl/casl.module");
const weapon_types_module_1 = require("./modules/weapon-types/weapon-types.module");
const clips_module_1 = require("./modules/clips/clips.module");
const specialities_module_1 = require("./modules/specialities/specialities.module");
const equipment_types_module_1 = require("./modules/equipment-types/equipment-types.module");
const fractions_module_1 = require("./modules/fractions/fractions.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const http_exceptions_filter_1 = require("./filters/http-exceptions.filter");
const typeorm_exceptions_filter_1 = require("./filters/typeorm-exceptions.filter");
const skin_types_module_1 = require("./modules/skin-types/skin-types.module");
const skins_module_1 = require("./modules/skins/skins.module");
const game_object_types_module_1 = require("./modules/game-object-types/game-object-types.module");
const game_objects_module_1 = require("./modules/game-objects/game-objects.module");
const gamemodes_module_1 = require("./modules/gamemodes/gamemodes.module");
const maps_module_1 = require("./modules/maps/maps.module");
const games_module_1 = require("./modules/games/games.module");
const lobbies_module_1 = require("./modules/lobbies/lobbies.module");
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
                    path: (0, path_1.join)(__dirname, 'i18n'),
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: constants_1.PATH_TO_STATIC,
            }),
            users_module_1.UsersModule,
            casl_module_1.CaslModule,
            auth_module_1.AuthModule,
            specialities_module_1.SpecialitiesModule,
            clips_module_1.ClipsModule,
            weapons_module_1.WeaponsModule,
            weapon_types_module_1.WeaponTypesModule,
            equipment_types_module_1.EquipmentTypesModule,
            fractions_module_1.FractionsModule,
            skin_types_module_1.SkinTypesModule,
            skins_module_1.SkinsModule,
            game_object_types_module_1.GameObjectTypesModule,
            game_objects_module_1.GameObjectsModule,
            gamemodes_module_1.GamemodesModule,
            maps_module_1.MapsModule,
            games_module_1.GamesModule,
            lobbies_module_1.LobbiesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: typeorm_exceptions_filter_1.TypeOrmExceptionsFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exceptions_filter_1.HttpExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map