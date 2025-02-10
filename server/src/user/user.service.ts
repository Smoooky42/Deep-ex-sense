import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {hash} from "argon2"

import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'
import { Role, User } from '@prisma/client'
import { AddRoleDto } from './dto/add-role.dto'
import { RolesService } from '../roles/roles.service'


@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService,
				private readonly rolesService: RolesService) {}

	async create(dto: AuthDto): Promise<User> {
		const user: User = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password),
			}
		})
		// const role = await this.roleService.getRoleByValue("ADMIN")
		// await user.$set('roles', [role.id])
		// user.roles = [role]
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
		const { roles: userRoles } = await this.prisma.user.findUnique({
			where: {
				id: dto.userId
			},
			select: {
				roles: true
			}
		});
		const role = await this.rolesService.findRoleByValue(dto.value);
		if (role && userRoles) {
			await this.prisma.usersOnRoles.create({
				data: {
					userId: dto.userId,
					roleId: role.id
				}
			})
			return true
		}
		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	}
}
