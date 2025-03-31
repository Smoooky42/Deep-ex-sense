import {
	ArrayMinSize,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
	@ApiProperty({ example: 'Футболка', description: 'Имя товара' })
	@IsString({ message: 'Название должно быть строкой' })
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	name: string

	@ApiProperty({
		example: 'Белая, материал хлопок',
		description: 'Описание товара'
	})
	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	description: string

	@ApiProperty({ example: '2200', description: 'цена' })
	@IsNumber({}, { message: 'Цена должна быть числом' })
	@IsNotEmpty({ message: 'Цена не может быть пустой' })
	price: number

	@ApiProperty({
		example: 'cm6tm5ofy0000ti1cji0dmyff',
		description: 'Id категории'
	})
	@IsString({ message: 'Категория должна быть строкой' })
	@IsNotEmpty({ message: 'ID категории не может быть пустым' })
	categoryId: string

	@ApiProperty({
		example:
			'/uploads/track/picture/1738864907730-free-icon-play-button-109197.png',
		description: 'Изображения товара(массив)'
	})
	@IsString({ message: 'Путь к файлу должен быть строкой', each: true })
	@ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка' })
	@IsNotEmpty({
		each: true,
		message: 'Путь к картинке не может быть пустым'
	})
	images: string[]
}
