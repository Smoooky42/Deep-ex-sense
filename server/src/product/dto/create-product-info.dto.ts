import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductInfoDto {
	@ApiProperty({ example: 'Материал', description: 'Имя характеристики' })
	@IsString({ message: 'Название должно быть строкой' })
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	title: string

	@ApiProperty({ example: 'Хлопок', description: 'Описание характеристики' })
	@IsString({ message: 'Описание должно быть строкой' })
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	description: string

	@ApiProperty({
		example: 'cm6toiblr0001tii8azu3qqvg',
		description: 'Id продукта'
	})
	@IsString({ message: 'Id продукта должно быть строкой' })
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	productId: string
}
