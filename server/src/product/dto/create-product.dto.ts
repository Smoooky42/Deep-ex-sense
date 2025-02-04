import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {

	@IsString({ message: 'Название обязательно' })
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	name: string

	@IsString({ message: 'Описание обязательно' })
	description: string

	@IsNumber({}, { message: 'Цена должна быть числом' })
	@IsNotEmpty({ message: 'Цена не может быть пустой' })
	price: number

	@IsString({ message: 'Категория обязательна' })
	@IsNotEmpty({ message: 'ID категории не может быть пустым' })
	categoryId: string

	@IsString({ message: 'Укажите хотя бы одну картинку', each: true })
	@ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка' })
	@IsNotEmpty({
		each: true,
		message: 'Путь к картинке не может быть пустым'
	})
	images: string[]
}
