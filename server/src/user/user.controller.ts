import { Controller, Get, HttpCode, Param } from '@nestjs/common'

import { UserService } from './user.service'
import {User} from '@prisma/client'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Auth()
  @Get()
  getAll() {
    return this.userService.getAll()
  }

  @HttpCode(200)
  @Auth()
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getById(id)
  }
}
