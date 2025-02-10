import {
  Body,
  Controller, Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import * as process from 'node:process'
import { ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger'

import { AuthDto } from './dto/auth.dto'
import { AuthService } from './auth.service';
import { User } from '@prisma/client'
import { UserResponse } from '../user/user.controller'

class authResponse {
  @ApiProperty({type: UserResponse})
  user: User
  @ApiProperty()
  accessToken: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({type: authResponse, description: 'Авторизация'})
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(
      @Body() dto: AuthDto,
      @Res({passthrough: true}) res: Response
  ): Promise<authResponse> {
    const {refreshToken, ...response} = await this.authService.login(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @ApiCreatedResponse({type: authResponse, description: 'Регистрация пользователя'})
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(
      @Body() dto: AuthDto,
      @Res({passthrough: true}) res: Response
  ) {
    const {refreshToken, ...response} = await this.authService.register(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @ApiCreatedResponse({type: authResponse, description: 'Выдача новых токенов'})
  @HttpCode(200)
  @Get('refresh')
  async getNewTokens(
      @Req() req: Request,
      @Res({passthrough: true}) res: Response
  ) {
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh токен отсутствует')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @ApiCreatedResponse({type: Boolean, description: 'Выход'})
  @HttpCode(200)
  @Get('logout')
  async logout(
      @Res({passthrough: true}) res: Response
  ) {
    this.authService.removeRefreshTokenFromResponse(res)
    return true
  }

  @ApiOperation({summary: 'Авторизация Google'})
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
      @Req() req: any,
      @Res({passthrough: true}) res: Response
  ) {
    const {refreshToken, ...response} = await this.authService.validateOAuthLogin(req)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return res.redirect(`${process.env['CLIENT_URL']}/dashboard?access_token=${response.accessToken}`)
  }

  @ApiOperation({summary: 'Авторизация Yandex'})
  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuth(@Req() _req) {}

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuthCallback(
      @Req() req: any,
      @Res({passthrough: true}) res: Response
  ) {
    const {refreshToken, ...response} = await this.authService.validateOAuthLogin(req)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return res.redirect(`${process.env['CLIENT_URL']}/dashboard?access_token=${response.accessToken}`)
  }
}
