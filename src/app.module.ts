import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as dotenv from 'dotenv';

dotenv.config();

import { AllExceptionsFilter } from './all-exceptions.filter';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeaponsModule } from './weapons/weapons.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ClipsModule } from './clips/clips.module';
import { MapsModule } from './maps/maps.module';
import { PermissionsModule } from './permissions/permissions.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, '/i18n/'),
      },
    }),
    UsersModule,
    AuthModule,
    WeaponsModule,
    EquipmentModule,
    ClipsModule,
    MapsModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
