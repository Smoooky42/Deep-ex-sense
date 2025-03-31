import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '../prisma.service'
import { Category } from '@prisma/client'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
		const category: Category = await this.prisma.category.create({
			data: {
				name: createCategoryDto.name
			}
		})
		return category
	}

	async findAll(): Promise<Category[]> {
		const categories: Category[] = await this.prisma.category.findMany({})
		return categories
	}

	async findOne(id: string): Promise<Category> {
		const category: Category = await this.prisma.category.findUnique({
			where: { id },
			include: { products: true }
		})
		return category
	}

	async update(
		id: string,
		updateCategoryDto: UpdateCategoryDto
	): Promise<Category> {
		const category: Category = await this.prisma.category.update({
			where: { id },
			data: {
				name: updateCategoryDto.name
			},
			include: { products: true }
		})
		return category
	}

	async remove(id: string): Promise<boolean> {
		const category: Category = await this.prisma.category.delete({
			where: { id }
		})
		return true
	}
}
