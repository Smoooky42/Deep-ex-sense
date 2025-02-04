import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import {verify} from 'argon2'

import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { AuthDto } from './dto/auth.dto'
import { Basket, User } from '@prisma/client'
import { BasketService } from '../basket/basket.service'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(private jwt: JwtService,
				private userService: UserService,
				private prisma: PrismaService,
				private configService: ConfigService,
				private basketService: BasketService) {}

	async login(dto: AuthDto) {
		const user: User = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)

		return {user, ...tokens}
	}

	async register(dto: AuthDto) {
		const oldUser: User = await this.userService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException('User already exists')

		const user: User = await this.userService.create(dto)
		const basket: Basket = await this.basketService.create(user.id)
		const tokens = this.issueTokens(user.id)

		return {user, ...tokens}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Невалидный refresh токен')

		const user: User = await this.userService.getById(result.id)
		if (!user) throw new NotFoundException(`User ${result.id} not found`)

		const tokens = this.issueTokens(user.id)

		return {user, ...tokens}
	}

	issueTokens(userId: string) {
		const data = {id: userId}

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})
		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return {accessToken, refreshToken}
	}

	private async validateUser(dto: AuthDto) {
		const user: User = await this.userService.getByEmail(dto.email)
		const passwordEqual = await verify(user.password, dto.password)

		if (!user || !passwordEqual) throw new NotFoundException(`Некорректный емайл или пароль`)

		return user
	}

	async validateOAuthLogin(req: any) {
		let user: User = await this.userService.getByEmail(req.user.email)

		if (!user) {
			user = await this.prisma.user.create({
				data: {
					email: req.user.email,
					name: req.user.name,
					picture: req.user.picture,
				}
			})
		}
		const tokens = this.issueTokens(user.id)

		return {user, ...tokens}
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: this.configService.get('SERVER_DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME,'', {
			httpOnly: true,
			domain: this.configService.get('SERVER_DOMAIN'),
			expires: new Date(0),
			secure: true,
			sameSite: 'none'
		})
	}
}
