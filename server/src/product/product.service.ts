import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service'
import { Product, ProductInfo } from '@prisma/client'
import { CreateProductInfoDto } from './dto/create-product-info.dto'
import { UpdateProductInfoDto } from './dto/update-product-info.dto'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = await this.prisma.product.create({
      data: {
        name : createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        categoryId: createProductDto.categoryId,
        images: createProductDto.images
      },
      include: {
        Category: true
      }
    })
    return product
  }

  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.prisma.product.findMany({
      include: {
        Category: true,
        productInfo: true,
      }
    })
    return products
  }

  async findOne(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        Category: true,
        productInfo: true,
      }
    })
    if (!product) throw new NotFoundException('Товар не найден')
    return product
  }

  async search(searchTerm: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        Category: true,
        productInfo: true,
      }
    })
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products: Product[] = await this.prisma.product.findMany({
      where: {
        Category: {
          id: categoryId
        }
      },
      include: {
        Category: true
      }
    })

    if (!products) throw new NotFoundException('Товары не найдены')

    return products
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product: Product = await this.prisma.product.update({
      where: {id},
      data: {...updateProductDto}
    })
    return product
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.product.delete({
      where: {
        id
      }
    })
    return true
  }

  async createProductInfo(dto: CreateProductInfoDto): Promise<ProductInfo> {
    const productInfo: ProductInfo = await this.prisma.productInfo.create({
      data: {
        title: dto.title,
        description: dto.description,
        Product: {
          connect: {
            id: dto.productId
          }
        },
      }
    })
    return productInfo
  }

  async updateProductInfo(id: string, dto: UpdateProductInfoDto): Promise<ProductInfo> {
    const productInfo: ProductInfo = await this.prisma.productInfo.update({
      where: {id},
      data: { ...dto}
    })
    return productInfo
  }

  async removeProductInfo(id: string): Promise<any>{
    await this.prisma.productInfo.delete({
      where: {
        id
      }
    })
    return true
  }
}
