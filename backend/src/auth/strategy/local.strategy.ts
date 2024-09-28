import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../commands/services/auth.service'
import { AuthException } from '../exceptions'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password'
		})
	}

	async validate(email: string, password: string) {
		try {
			const data = await this.authService.validateUser({
				email,
				password
			})
			if (!data) {
				throw new UnauthorizedException()
			}
			return { user: data.user, profile: data.profile }
		} catch (error) {
			if (error instanceof AuthException) {
				throw new UnauthorizedException(error.message)
			}
			throw new UnauthorizedException()
		}
	}
}
