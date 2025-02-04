import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {

	@IsString({message: 'Название должно быть строкой'})
	@IsNotEmpty({message: 'Название не может быть пустым'})
	name: string
}
