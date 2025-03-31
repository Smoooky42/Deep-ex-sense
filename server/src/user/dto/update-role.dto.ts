import { PartialType } from '@nestjs/mapped-types'
import { AddRoleDto } from './add-role.dto'

export class UpdateRole extends PartialType(AddRoleDto) {}
