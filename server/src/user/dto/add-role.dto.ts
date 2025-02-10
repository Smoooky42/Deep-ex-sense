import {IsNumber, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {

	@ApiProperty({example: 'ADMIN', description: 'Новая роль для пользователя'})
	@IsString({message: "Должно быть строкой"})
	readonly value: string;

	@ApiProperty({example: 'cm6i3puc50000tiqch30n9ewb', description: 'Id пользователя'})
	@IsString({message: "Должно быть строкой"})
	readonly userId: string;
}