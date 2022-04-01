import { join } from 'path';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as dotenv from 'dotenv';

dotenv.config();

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeaponsModule } from './weapons/weapons.module';
import { CaslModule } from './casl/casl.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AllExceptionsFilter } from './filters/all-exceptions.filter';

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
    CaslModule,
    AuthModule,
    WeaponsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
