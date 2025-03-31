import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class OrderItemDto {
	@ApiProperty({ example: '3', description: 'Количество товара' })
	@IsNumber({}, { message: 'Количество должно быть числом' })
	quantity: number

	@ApiProperty({ example: '2200', description: 'Цена за единицу товара' })
	@IsNumber({}, { message: 'Цена должна быть числом' })
	price: number

	@ApiProperty({
		example: 'cm6i3puc50000tiqch30n9ewb',
		description: 'Id продукта'
	})
	@IsString({ message: 'ID продукта должен быть строкой' })
	productId: string
}

export class OrderDto {
	@ApiProperty({
		enum: EnumOrderStatus,
		example: 'PENDING',
		description: 'Статут заказа'
	})
	@IsOptional()
	@IsEnum(EnumOrderStatus, { message: 'Статус заказа обязателен' })
	status: EnumOrderStatus

	@ApiProperty({ type: [OrderItemDto], description: 'Список товаров' })
	@IsArray({ message: 'В заказе нет ни одного товара' })
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
}
