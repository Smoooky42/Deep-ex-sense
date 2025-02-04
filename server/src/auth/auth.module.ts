import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'
import { getJwtConfig } from '../config/jwt.config'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { YandexStrategy } from './strategies/yandex.strategy'
import { BasketModule } from '../basket/basket.module'
import { BasketService } from '../basket/basket.service'

@Module({
  imports: [UserModule, ConfigModule,BasketModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, BasketService, JwtStrategy, GoogleStrategy, YandexStrategy],
})
export class AuthModule {}
