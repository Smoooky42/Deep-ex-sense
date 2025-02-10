import { Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { BasketService } from './basket.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import {Basket} from '@prisma/client'

class BasketResponse implements Basket {
    @ApiProperty()
    id: string
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updatedAt: Date
    @ApiProperty()
    userId: string
}

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {}

    @ApiCreatedResponse({type: BasketResponse, description: 'Получение корзины по токену'})
    @HttpCode(200)
    @Auth()
    @Get()
    getBasket(@CurrentUser('id') userId: string) {
        return this.basketService.getBasket(userId)
    }

    @ApiCreatedResponse({type: Boolean, description: 'Добавление продуктов в корзину'})
    @HttpCode(200)
    @Auth()
    @Post('products')
    addProductsInBasket(@CurrentUser('id') userId: string, productsId: string[]) {
        return this.basketService.addProductsInBasket(userId, productsId)
    }
}
