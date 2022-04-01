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
const nestjs_i18n_1 = require("nestjs-i18n");
const dotenv = require("dotenv");
dotenv.config();
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const weapons_module_1 = require("./weapons/weapons.module");
const casl_module_1 = require("./casl/casl.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const all_exceptions_filter_1 = require("./filters/all-exceptions.filter");
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
            casl_module_1.CaslModule,
            auth_module_1.AuthModule,
            weapons_module_1.WeaponsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
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