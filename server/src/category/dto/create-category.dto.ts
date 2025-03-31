import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
	@ApiProperty({ example: 'Одежда', description: 'Категория товара' })
	@IsString({ message: 'Название должно быть строкой' })
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	name: string
}
