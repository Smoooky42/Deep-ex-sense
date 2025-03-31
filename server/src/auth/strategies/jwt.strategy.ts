import { Injectable } from '@nestjs/common'
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
			secretOrKey: configService.get('JWT_SECRET_KEY')
		})
	}

	async validate(userData: { id: string }) {
		return this.userService.getById(userData.id)

		// const req = context.switchToHttp().getRequest() //Можно только в canActive. В passport ответ автоматически вставляется в req.user
		// req.user.id = userData.id
		// return true
	}
}
