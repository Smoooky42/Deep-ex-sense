import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import {Basket} from '@prisma/client'

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string): Promise<Basket> {
    const basket: Basket = await this.prisma.basket.create({
      data: {
        userId
      }
    })

    return basket
  }

  async getBasket(userId: string): Promise<Basket> {
    const basket: Basket = await this.prisma.basket.findUnique({
      where: {
        userId
      },
      include: {products: true}
    })

    return basket
  }

  async addProductsInBasket(userId: string, productsId: string[]): Promise<boolean> {
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
