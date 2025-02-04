import { Controller, Get, HttpCode, Req } from '@nestjs/common'

import { BasketService } from './basket.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { Basket } from '@prisma/client'
import { CurrentUser } from '../user/decorators/user.decorator'

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @HttpCode(200)
  @Auth()
  @Get()
  getBasket(@CurrentUser('id') userId: string) {
    return this.basketService.getBasket(userId)
  }

  @HttpCode(200)
  @Auth()
  @Get()
  getAllProducts(@CurrentUser('id') userId: string) {
    return this.basketService.getAllProducts(userId)
  }
}
