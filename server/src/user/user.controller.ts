import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { UserService } from './user.service'
import {User} from '@prisma/client'
import { Auth } from '../auth/decorators/auth.decorator'
import { AddRoleDto } from './dto/add-role.dto'
import { Roles } from '../auth/decorators/roles.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'

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
    @Get()
    async getAll() {
        return await this.userService.getAll()
    }

    @ApiCreatedResponse({type: UserResponse, description: 'Создание трека'})
    @HttpCode(200)
    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.userService.getById(id)
    }

    @ApiCreatedResponse({type: Boolean, description: 'Создание трека'})
    @HttpCode(200)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    async addRole(@Body() dto: AddRoleDto) {
        return await this.userService.addRole(dto);
    }
}
