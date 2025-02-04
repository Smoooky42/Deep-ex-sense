import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, UsePipes, ValidationPipe, Query
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CreateProductInfoDto } from './dto/create-product-info.dto'
import { UpdateProductInfoDto } from './dto/update-product-info.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @HttpCode(200)
  @Get('/search')
  search(@Query('query') query: string) {
    return this.productService.search(query)
  }

  @HttpCode(200)
  @Get('by-category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.findByCategory(categoryId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @HttpCode(200)
  @Post('/productInfo/:id')
  createProductsInfo(@Body() createProductInfoDto: CreateProductInfoDto,
                     @Param('id') id: string) {
    return this.productService.createProductInfo(id, createProductInfoDto)
  }

  @HttpCode(200)
  @Patch('/productInfo/:id')
  updateProductsInfo(@Body() updateProductInfoDto: UpdateProductInfoDto,
                     @Param('id') id: string) {
    return this.productService.updateProductInfo(id, updateProductInfoDto)
  }
}
