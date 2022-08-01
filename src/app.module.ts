import { join } from 'path';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as dotenv from 'dotenv';

dotenv.config();

import { PATH_TO_STATIC } from './constants/constants';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WeaponsModule } from './modules/weapons/weapons.module';
import { CaslModule } from './modules/casl/casl.module';
import { WeaponTypesModule } from './modules/weapon-types/weapon-types.module';
import { ClipsModule } from './modules/clips/clips.module';
import { SpecialitiesModule } from './modules/specialities/specialities.module';
import { EquipmentTypesModule } from './modules/equipment-types/equipment-types.module';
import { FractionsModule } from './modules/fractions/fractions.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpExceptionsFilter } from './filters/http-exceptions.filter';
import { TypeOrmExceptionsFilter } from './filters/typeorm-exceptions.filter';
import { SkinTypesModule } from './modules/skin-types/skin-types.module';
import { SkinsModule } from './modules/skins/skins.module';
import { GameObjectTypesModule } from './modules/game-object-types/game-object-types.module';
import { GameObjectsModule } from './modules/game-objects/game-objects.module';
import { GamemodesModule } from './modules/gamemodes/gamemodes.module';
import { MapsModule } from './modules/maps/maps.module';
import { GamesModule } from './modules/games/games.module';
import { LobbiesModule } from './modules/lobbies/lobbies.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, 'i18n'),
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: PATH_TO_STATIC,
    }),
    UsersModule,
    CaslModule,
    AuthModule,
    SpecialitiesModule,
    ClipsModule,
    WeaponsModule,
    WeaponTypesModule,
    EquipmentTypesModule,
    FractionsModule,
    SkinTypesModule,
    SkinsModule,
    GameObjectTypesModule,
    GameObjectsModule,
    GamemodesModule,
    MapsModule,
    GamesModule,
    LobbiesModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
