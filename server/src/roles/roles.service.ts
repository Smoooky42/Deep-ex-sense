import { Injectable } from '@nestjs/common'

import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { PrismaService } from '../prisma.service'
import { Role } from '@prisma/client'

@Injectable()
export class RolesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createRoleDto: CreateRoleDto): Promise<Role> {
		const role: Role = await this.prisma.role.create({
			data: {
				value: createRoleDto.value,
				description: createRoleDto.description
			}
		})
		return role
	}

	async findAll(): Promise<Role[]> {
		const roles: Role[] = await this.prisma.role.findMany({})
		return roles
	}

	async findRoleByValue(value: string): Promise<Role> {
		const role: Role = await this.prisma.role.findUnique({
			where: {
				value
			}
		})
		return role
	}

	async remove(id: string) {
		await this.prisma.role.delete({
			where: {
				id
			}
		})
		return true
	}
}
