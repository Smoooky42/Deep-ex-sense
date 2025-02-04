import { Injectable } from '@nestjs/common';
import {hash} from "argon2"

import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'
import {User} from '@prisma/client'


@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: AuthDto): Promise<User> {
		const user: User = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password),
			}
		})
		return user
	}

	async getById(id: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: { id },
			include: {
				orders: true,
				basket: true
			}
		})
		return user
	}

	async getByEmail(email: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: { email },
			include: {
				orders: true,
				basket: true
			}
		})
		return user
	}

	async getAll(): Promise<User[]> {
		const users: User[] = await this.prisma.user.findMany({
			include: {
				orders: true,
				basket: true
			}
		})

		return users
	}
}
