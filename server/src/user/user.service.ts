import { Injectable } from '@nestjs/common';
import {hash} from "argon2"

import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})
		return user
	}

	async getByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email }
		})
		return user
	}

	async create(dto: AuthDto) {
		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password),
			}
		})
		return user
	}
}
