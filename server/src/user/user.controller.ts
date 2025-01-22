import { Body, Post, Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'

import { AuthDto } from '../auth/dto/auth.dto'
import { AuthService } from '../auth/auth.service'

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
}
