import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductInfoDto {

	@IsString({ message: 'Название должно быть строкой'})
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	title: string

	@IsString({ message: 'Описание должно быть строкой'})
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	description: string

	@IsString({ message: 'Id продукта должно быть строкой'})
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	productId: string
}