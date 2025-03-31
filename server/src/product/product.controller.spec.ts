import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

describe('ProductController', () => {
	let controller: ProductController
	let service: ProductService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductController],
			providers: [
				{
					provide: ProductService,
					useValue: {
						create: jest.fn(),
						findAll: jest.fn(),
						search: jest.fn(),
						findByCategory: jest.fn(),
						createProductInfo: jest.fn(),
						updateProductInfo: jest.fn(),
						removeProductInfo: jest.fn(),
						update: jest.fn(),
						remove: jest.fn(),
						findOne: jest.fn()
					}
				}
			]
		}).compile()

		controller = module.get<ProductController>(ProductController)
		service = module.get<ProductService>(ProductService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	describe('create', () => {
		it('should call ProductService.create with correct parameters', async () => {
			const dto: CreateProductDto = {
				name: 'Test Product',
				description: 'Test Description',
				price: 100,
				images: [],
				categoryId: 'category-id'
			}
			await controller.create(dto)
			expect(service.create).toHaveBeenCalledWith(dto)
		})
	})

	describe('findAll', () => {
		it('should call ProductService.findAll', async () => {
			await controller.findAll()
			expect(service.findAll).toHaveBeenCalled()
		})
	})

	describe('search', () => {
		it('should call ProductService.search with correct parameters', async () => {
			const searchTerm = 'test'
			await controller.search(searchTerm)
			expect(service.search).toHaveBeenCalledWith(searchTerm)
		})
	})

	describe('findByCategory', () => {
		it('should call ProductService.findByCategory with correct parameters', async () => {
			const categoryId = 'category-id'
			await controller.findByCategory(categoryId)
			expect(service.findByCategory).toHaveBeenCalledWith(categoryId)
		})
	})

	describe('update', () => {
		it('should call ProductService.update with correct parameters', async () => {
			const id = 'product-id'
			const dto: UpdateProductDto = {
				name: 'Updated Product',
				description: 'Updated Description',
				price: 200,
				images: [],
				categoryId: 'updated-category-id'
			}
			await controller.update(id, dto)
			expect(service.update).toHaveBeenCalledWith(id, dto)
		})
	})

	describe('remove', () => {
		it('should call ProductService.remove with correct parameters', async () => {
			const id = 'product-id'
			await controller.remove(id)
			expect(service.remove).toHaveBeenCalledWith(id)
		})
	})

	describe('findOne', () => {
		it('should call ProductService.findOne with correct parameters', async () => {
			const id = 'product-id'
			await controller.findOne(id)
			expect(service.findOne).toHaveBeenCalledWith(id)
		})
	})
})
