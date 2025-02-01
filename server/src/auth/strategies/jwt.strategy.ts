import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET_KEY'),
		})
	}

	async validate({id}:{id:string}) {
		try {
			return this.userService.getById(id)
		} catch(e){
			throw new HttpException('Токен валидный, но пользователя нет в БД', 500)
		}
	}
}