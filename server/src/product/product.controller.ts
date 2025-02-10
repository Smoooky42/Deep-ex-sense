import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, UsePipes, ValidationPipe, Query, UseGuards
} from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CreateProductInfoDto } from './dto/create-product-info.dto'
import { UpdateProductInfoDto } from './dto/update-product-info.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { Roles } from '../auth/decorators/roles-auth.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Product, ProductInfo } from '@prisma/client'

class ProductResponse implements Product {
  @ApiProperty()
  name: string
  @ApiProperty()
  id: string
  @ApiProperty()
  createdAt: Date
  @ApiProperty()
  updatedAt: Date
  @ApiProperty()
  description: string
  @ApiProperty()
  price: number
  @ApiProperty()
  images: string[]
  @ApiProperty()
  categoryId: string

}
class ProductInfoResponse implements ProductInfo {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  title: string
  productId: string

}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({type: ProductResponse, description: 'Создание продукта'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiCreatedResponse({type: [ProductResponse], description: 'Получение всех продуктов'})
  @HttpCode(200)
  @Auth()
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiCreatedResponse({type: ProductResponse, description: 'Получение продукта по Id'})
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiCreatedResponse({type: [ProductResponse], description: 'Поиск продукта'})
  @HttpCode(200)
  @Get('/search')
  search(@Query('query') query: string) {
    return this.productService.search(query)
  }

  @ApiCreatedResponse({type: [ProductResponse], description: 'Получение продуктов по категории'})
  @HttpCode(200)
  @Get('by-category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.findByCategory(categoryId)
  }

  @ApiCreatedResponse({type: ProductResponse, description: 'Обновление продукта'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiCreatedResponse({type: Boolean, description: 'Удаление продукта'})
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @ApiCreatedResponse({type: ProductInfoResponse, description: 'Создание информации о продукте'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Post('/productInfo/:id')
  createProductsInfo(@Body() createProductInfoDto: CreateProductInfoDto,
                     @Param('id') id: string) {
    return this.productService.createProductInfo(id, createProductInfoDto)
  }

  @ApiCreatedResponse({type: ProductInfoResponse, description: 'Обновление информации о продукте'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/productInfo/:id')
  updateProductsInfo(@Body() updateProductInfoDto: UpdateProductInfoDto,
                     @Param('id') id: string) {
    return this.productService.updateProductInfo(id, updateProductInfoDto)
  }

  @ApiCreatedResponse({type: Boolean, description: 'Удаление информации о продукте'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Delete()
  removeProductInfo(@Param('id') id: string) {
    return this.productService.removeProductInfo(id)
  }
}
