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
import { Roles } from '../auth/decorators/roles.decorator'
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

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({type: ProductResponse, description: 'Создание продукта'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @ApiCreatedResponse({type: [ProductResponse], description: 'Получение всех продуктов'})
  @HttpCode(200)
  // @Auth()
  // @Roles("ADMIN")  //Если использую, то надо использовать JWTModule
  //@UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @ApiCreatedResponse({type: [ProductResponse], description: 'Поиск продукта'})
  @HttpCode(200)
  @Get('search')
  async search(@Query('searchTerm') searchTerm?: string) {
    return await this.productService.search(searchTerm)
  }

  @ApiCreatedResponse({type: [ProductResponse], description: 'Получение продуктов по категории'})
  @HttpCode(200)
  @Get('by-category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.productService.findByCategory(categoryId)
  }

  @ApiCreatedResponse({type: ProductInfoResponse, description: 'Создание информации о продукте'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Post('/productInfo/:id')
  async createProductsInfo(@Body() createProductInfoDto: CreateProductInfoDto) {
    return await this.productService.createProductInfo(createProductInfoDto)
  }
  
  @ApiCreatedResponse({type: ProductInfoResponse, description: 'Обновление информации о продукте'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/productInfo/:id')
  async updateProductsInfo(@Body() updateProductInfoDto: UpdateProductInfoDto,
                     @Param('id') id: string) {
    return await this.productService.updateProductInfo(id, updateProductInfoDto)
  }

  @ApiCreatedResponse({type: Boolean, description: 'Удаление информации о продукте'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Delete('/productInfo/:id')
  async removeProductInfo(@Param('id') id: string) {
    return await this.productService.removeProductInfo(id)
  }

  @ApiCreatedResponse({type: ProductResponse, description: 'Обновление продукта'})
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @ApiCreatedResponse({type: Boolean, description: 'Удаление продукта'})
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  @ApiCreatedResponse({type: ProductResponse, description: 'Получение продукта по Id'})
  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

}
