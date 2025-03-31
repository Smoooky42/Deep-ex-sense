import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { Category } from '@prisma/client'

class CategoryResponse implements Category {
	@ApiProperty()
	name: string
	@ApiProperty()
	id: string
	@ApiProperty()
	createdAt: Date
	@ApiProperty()
	updatedAt: Date
}

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiCreatedResponse({
		type: CategoryResponse,
		description: 'Создание категории'
	})
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		return await this.categoryService.create(createCategoryDto)
	}

	@ApiCreatedResponse({
		type: CategoryResponse,
		description: 'Получение всех категорий'
	})
	@HttpCode(200)
	@Get()
	async findAll() {
		return await this.categoryService.findAll()
	}

	@ApiCreatedResponse({
		type: CategoryResponse,
		description: 'Получение категории по Id'
	})
	@HttpCode(200)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.categoryService.findOne(id)
	}

	@ApiCreatedResponse({
		type: CategoryResponse,
		description: 'Обновление категории'
	})
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		return await this.categoryService.update(id, updateCategoryDto)
	}

	@ApiCreatedResponse({ type: Boolean, description: 'Удаление категории' })
	@HttpCode(200)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.categoryService.remove(id)
	}
}
