import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty } from 'class-validator'

export class FileUploadDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	@IsArray({ message: 'Должна быть хотя бы одна картинка' })
	@IsNotEmpty({ each: true, message: 'Путь к картинке не может быть пустым' })
	file: any[]
}
