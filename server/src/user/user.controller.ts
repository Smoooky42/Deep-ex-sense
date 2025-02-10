import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { UserService } from './user.service'
import {User} from '@prisma/client'
import { Auth } from '../auth/decorators/auth.decorator'
import { AddRoleDto } from './dto/add-role.dto'

export class UserResponse implements User {
    @ApiProperty()
    name: string
    @ApiProperty()
    id: string
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updatedAt: Date
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    picture: string
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiCreatedResponse({type: [UserResponse], description: 'Создание трека'})
    @HttpCode(200)
    @Auth()
    @Get()
    getAll() {
        return this.userService.getAll()
    }

    @ApiCreatedResponse({type: UserResponse, description: 'Создание трека'})
    @HttpCode(200)
    @Auth()
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.userService.getById(id)
    }

    @ApiCreatedResponse({type: Boolean, description: 'Создание трека'})
    @HttpCode(200)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }
}
