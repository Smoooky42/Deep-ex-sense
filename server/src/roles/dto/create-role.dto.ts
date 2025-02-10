import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Имя роли'})
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    readonly value: string;

    @ApiProperty({example: 'Полный доступ', description: 'Описание  роли'})
    @IsString({ message: 'Описание должно быть строкой' })
    @IsNotEmpty({ message: 'Описание не может быть пустым' })
    readonly description: string;
}
