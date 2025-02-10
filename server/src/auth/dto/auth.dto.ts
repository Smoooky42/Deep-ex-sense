import {IsOptional, IsEmail, IsString, MinLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

 export class AuthDto {

	@ApiProperty({example: 'Алексей', description: 'Имя'})
	@IsOptional()
	@IsString()
	name:string

	 @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
	 @IsEmail()
	 email:string

	 @ApiProperty({example: '12345', description: 'пароль'})
	 @IsString({message: 'Password is required'})
	 @MinLength(6, { message: 'Password must be at least 6 characters long' })
	 password:string
 }