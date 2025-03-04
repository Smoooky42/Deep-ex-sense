import { Controller, Get, Post, Body, Param, Delete, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger'

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Auth } from '../auth/decorators/auth.decorator'
import { Role } from '@prisma/client'

class RoleResponse implements Role {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  value: string;
  @ApiProperty()
  description: string;
}

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiCreatedResponse({type: RoleResponse, description: 'Удаление информации о продукте'})
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @ApiCreatedResponse({type: [RoleResponse], description: 'Удаление информации о продукте'})
  @HttpCode(200)
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @ApiCreatedResponse({type: Boolean, description: 'Удаление информации о продукте'})
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(id);
  }
}
