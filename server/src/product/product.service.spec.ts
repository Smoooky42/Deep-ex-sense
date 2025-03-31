import { Test, TestingModule } from '@nestjs/testing'
import { ProductService } from './product.service'
import { PrismaService } from '../prisma.service'
import { NotFoundException } from '@nestjs/common'

describe('ProductService', () => {
	let service: ProductService
	let prisma: PrismaService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductService, PrismaService]
		}).compile()

		service = module.get<ProductService>(ProductService)
		prisma = module.get<PrismaService>(PrismaService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('create', () => {
		it('should create a product', async () => {
			const createProductDto = {
				name: 'Test Product',
				description: 'Test Description',
				price: 100,
				categoryId: 'category-id',
				images: ['image1.jpg', 'image2.jpg']
			}

			const createdProduct = {
				id: 'product-id',
				...createProductDto,
				Category: { id: 'category-id', name: 'Test Category' }
			}

			jest.spyOn(prisma.product, 'create').mockResolvedValue(
				createdProduct as any
			)

			const result = await service.create(createProductDto)
			expect(result).toEqual(createdProduct)
		})
	})

	describe('findAll', () => {
		it('should return all products', async () => {
			const products = [
				{
					id: '1',
					createdAt: new Date('2023-01-01'),
					updatedAt: new Date('2023-01-02'),
					name: 'Product 1',
					description: 'Description 1',
					price: 100,
					images: ['image1.jpg', 'image2.jpg'],
					categoryId: 'category-id-1'
				},
				{
					id: '2',
					createdAt: new Date('2023-01-03'),
					updatedAt: new Date('2023-01-04'),
					name: 'Product 2',
					description: 'Description 2',
					price: 200,
					images: ['image3.jpg', 'image4.jpg'],
					categoryId: 'category-id-2'
				}
			]

			jest.spyOn(prisma.product, 'findMany').mockResolvedValue(
				products as any
			)

			const result = await service.findAll()
			expect(result).toEqual(products)
		})
	})

	describe('findOne', () => {
		it('should return a product by id', async () => {
			const product = {
				id: '1',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-02'),
				name: 'Product 1',
				description: 'Description 1',
				price: 100,
				images: ['image1.jpg', 'image2.jpg'],
				categoryId: 'category-id-1'
			}

			jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(
				product as any
			)

			const result = await service.findOne('1')
			expect(result).toEqual(product)
		})

		it('should throw NotFoundException if product not found', async () => {
			jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null)

			await expect(service.findOne('1')).rejects.toThrow(
				NotFoundException
			)
		})
	})

	describe('search', () => {
		it('should return products matching the search term', async () => {
			const searchTerm = 'Test'
			const products = [
				{
					id: '1',
					createdAt: new Date('2023-01-01'),
					updatedAt: new Date('2023-01-02'),
					name: 'Test Product',
					description: 'Description 1',
					price: 100,
					images: ['image1.jpg', 'image2.jpg'],
					categoryId: 'category-id-1'
				},
				{
					id: '2',
					createdAt: new Date('2023-01-03'),
					updatedAt: new Date('2023-01-04'),
					name: 'Product 2',
					description: 'Description 2',
					price: 200,
					images: ['image3.jpg', 'image4.jpg'],
					categoryId: 'category-id-2'
				}
			]

			jest.spyOn(prisma.product, 'findMany').mockResolvedValue(
				products as any
			)

			const result = await service.search(searchTerm)
			expect(result).toEqual(products)
		})

		it('should return all products if no search term is provided', async () => {
			const products = [
				{
					id: '1',
					createdAt: new Date('2023-01-01'),
					updatedAt: new Date('2023-01-02'),
					name: 'Test Product',
					description: 'Description 1',
					price: 100,
					images: ['image1.jpg', 'image2.jpg'],
					categoryId: 'category-id-1'
				},
				{
					id: '2',
					createdAt: new Date('2023-01-03'),
					updatedAt: new Date('2023-01-04'),
					name: 'Product 2',
					description: 'Description 2',
					price: 200,
					images: ['image3.jpg', 'image4.jpg'],
					categoryId: 'category-id-2'
				}
			]

			jest.spyOn(service, 'findAll').mockResolvedValue(products)

			const result = await service.search()
			expect(result).toEqual(products)
		})
	})

	describe('findByCategory', () => {
		it('should return products by category', async () => {
			const categoryId = 'category-id-2'
			const products = [
				{
					id: '1',
					createdAt: new Date('2023-01-01'),
					updatedAt: new Date('2023-01-02'),
					name: 'Product 1',
					description: 'Description 1',
					price: 100,
					images: ['image1.jpg', 'image2.jpg'],
					categoryId: 'category-id-1'
				},
				{
					id: '2',
					createdAt: new Date('2023-01-03'),
					updatedAt: new Date('2023-01-04'),
					name: 'Product 2',
					description: 'Description 2',
					price: 200,
					images: ['image3.jpg', 'image4.jpg'],
					categoryId: categoryId
				}
			]

			jest.spyOn(prisma.product, 'findMany').mockResolvedValue(
				Array(products[1]) as any
			)

			const result = await service.findByCategory(categoryId)
			expect(result).toEqual(Array(products[1]))
		})

		it('should throw NotFoundException if no products found', async () => {
			jest.spyOn(prisma.product, 'findMany').mockResolvedValue([])

			await expect(service.findByCategory('category-id')).rejects.toThrow(
				NotFoundException
			)
		})
	})

	describe('update', () => {
		it('should update a product', async () => {
			const updateProductDto = { name: 'Updated Product' }
			const updatedProduct = { id: '1', ...updateProductDto }

			jest.spyOn(prisma.product, 'update').mockResolvedValue(
				updatedProduct as any
			)

			const result = await service.update('1', updateProductDto)
			expect(result).toEqual(updatedProduct)
		})
	})

	describe('remove', () => {
		it('should remove a product', async () => {
			jest.spyOn(prisma.product, 'delete').mockResolvedValue({} as any)

			const result = await service.remove('1')
			expect(result).toBe(true)
		})
	})

	describe('createProductInfo', () => {
		it('should create product info', async () => {
			const createProductInfoDto = {
				title: 'Info Title',
				description: 'Info Description',
				productId: 'product-id'
			}

			const createdProductInfo = {
				id: 'info-id',
				...createProductInfoDto
			}

			jest.spyOn(prisma.productInfo, 'create').mockResolvedValue(
				createdProductInfo as any
			)

			const result = await service.createProductInfo(createProductInfoDto)
			expect(result).toEqual(createdProductInfo)
		})
	})

	describe('updateProductInfo', () => {
		it('should update product info', async () => {
			const updateProductInfoDto = { title: 'Updated Title' }
			const updatedProductInfo = {
				id: 'info-id',
				...updateProductInfoDto
			}

			jest.spyOn(prisma.productInfo, 'update').mockResolvedValue(
				updatedProductInfo as any
			)

			const result = await service.updateProductInfo(
				'info-id',
				updateProductInfoDto
			)
			expect(result).toEqual(updatedProductInfo)
		})
	})

	describe('removeProductInfo', () => {
		it('should remove product info', async () => {
			jest.spyOn(prisma.productInfo, 'delete').mockResolvedValue(
				{} as any
			)

			const result = await service.removeProductInfo('info-id')
			expect(result).toBe(true)
		})
	})
})
