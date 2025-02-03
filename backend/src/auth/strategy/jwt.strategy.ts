// auth/jwt.strategy.ts
import { configuration } from '@app/config/configuration'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { CurrentUserDto } from '../dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configuration.jwt.secret
		})
	}

	async validate(payload: CurrentUserDto) {
		//You can add another validation for each user
		return payload
	}
}
