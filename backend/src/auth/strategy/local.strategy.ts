import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
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
				password,
				skipVerification: true
			})
			if (!data) {
				throw new UnauthorizedException({
					message: 'Invalid email or password',
					code: 'INVALID_CREDENTIALS'
				})
			}
			return data
		} catch (error) {
			if (error instanceof AuthException) {
				throw new UnauthorizedException({
					message: error.message,
					code: error.code,
					status: HttpStatus.UNAUTHORIZED
				})
			}
			throw new UnauthorizedException(error.message)
		}
	}
}
