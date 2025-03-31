import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'
import { User } from '@prisma/client'
import { AddRoleDto } from './dto/add-role.dto'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly rolesService: RolesService
	) {}

	async create(dto: AuthDto): Promise<User> {
		const role = await this.rolesService.findRoleByValue('USER')
		if (!role)
			await this.rolesService.create({
				value: 'USER',
				description: 'user'
			})

		const user: User = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password),
				roles: {
					connect: {
						id: role.id
					}
				}
			},
			include: {
				roles: true
			}
		})

		return user
	}

	async getById(id: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: { id },
			include: {
				orders: true,
				basket: true,
				roles: true
			}
		})
		return user
	}

	async getByEmail(email: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: { email },
			include: {
				orders: true,
				basket: true,
				roles: true
			}
		})
		return user
	}

	async getAll(): Promise<User[]> {
		const users: User[] = await this.prisma.user.findMany({
			include: {
				orders: true,
				basket: true,
				roles: true
			}
		})
		return users
	}

	async addRole(dto: AddRoleDto): Promise<boolean> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: dto.userId
			}
		})
		const role = await this.rolesService.findRoleByValue(dto.value)
		if (role && user) {
			await this.prisma.user.update({
				where: {
					id: dto.userId
				},
				data: {
					roles: {
						connect: {
							value: dto.value
						}
					}
				}
			})
			return true
		}
		throw new HttpException(
			'Пользователь или роль не найдены',
			HttpStatus.NOT_FOUND
		)
	}
}
