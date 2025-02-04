import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import {BasketsOnProducts, Basket} from '@prisma/client'

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string) {
    const basket: Basket = await this.prisma.basket.create({
      data: {
        userId
      }
    })

    return basket
  }

  async getBasket(userId: string) {
    const basket: Basket = await this.prisma.basket.findUnique({
      where: {
        userId
      }
    })

    return basket
  }

  async getAllProducts(userId: string){
    const basket: Basket = await this.getBasket(userId)
    const products: BasketsOnProducts[]  = await this.prisma.basketsOnProducts.findMany({
      where: {
        basketId: basket.id
      }
    })
    return products
  }

  async addProductsInBasket(userId: string, productsId: string[]) {
    const basket: Basket = await this.getBasket(userId)

    const products = await Promise.all(
        productsId.map(async (productId: string) => {
          this.prisma.basketsOnProducts.create({
            data: {
              basketId: basket.id,
              productId: productId,
            }
          })
        })
    )
    if (!products) throw new HttpException('Product not found', 500)

    return true
  }
}
