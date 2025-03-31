import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTrackDto {
	@ApiProperty({
		example: 'Инквизитор всегда прав',
		description: 'Имя трека'
	})
	@IsString({ message: 'Please enter a valid name' })
	@IsNotEmpty({ message: 'Name cannot be empty' })
	readonly name: string

	@ApiProperty({ example: 'Deep-ex-sense', description: 'Имя артиста' })
	@IsOptional()
	@IsString({ message: 'Please enter a valid name' })
	@IsNotEmpty({ message: 'Artist cannot be empty' })
	readonly artist: string

	@ApiProperty({ example: 'Текст трека', description: 'Текст трека' })
	@IsOptional()
	@IsString({ message: 'Please enter a valid name' })
	readonly text: string

	@ApiProperty({
		example:
			'/uploads/track/picture/1738864907730-free-icon-play-button-109197.png',
		description: 'Путь к изображение трека'
	})
	@IsString({ message: 'Укажите хотя бы одну картинку' })
	@IsNotEmpty({ each: true, message: 'Путь к картинке не может быть пустым' })
	picture: string

	@ApiProperty({
		example:
			'/uploads/track/picture/1738864907730-free-icon-play-button-109197.png',
		description: 'Путь к треку'
	})
	@IsString({ message: 'Укажите хотя бы одну картинку' })
	@IsNotEmpty({ each: true, message: 'Путь к картинке не может быть пустым' })
	audio: string
}
