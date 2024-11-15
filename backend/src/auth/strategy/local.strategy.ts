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
			const data = await this.authService.validateLocalUser({
				email,
				password
			})
			if (!data) {
				throw new UnauthorizedException('Invalid credentials')
			}
			return data
		} catch (error) {
			if (error instanceof AuthException) {
				throw new UnauthorizedException({
					message: error.message,
					code: error.code
				})
			}
			throw new UnauthorizedException(error.message)
		}
	}
}
