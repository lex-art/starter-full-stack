import { CurrentUserDto } from '@app/auth/dto'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators/user.validator'
import { GeneralResponse } from '@app/types'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FindUserService } from './find-user.service'

@Injectable()
export class RefreshTokenService {
	private readonly logger = new Logger(RefreshTokenService.name)

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly findUserService: FindUserService
	) {}

	async refreshToken(user: CurrentUserDto): Promise<GeneralResponse> {
		try {
			const { email, userId } = user
			const validateUser = await this.findUserService.getUser(email, userId)

			const error = Object.entries(userValidator).find(([, validator]) => validator(validateUser))
			if (error) {
				const [key] = error
				throw new AuthException(key, key.toUpperCase())
			}

			const payload: CurrentUserDto = {
				userId: validateUser.userId,
				email: validateUser.email,
				accountId: validateUser.account[0].accountId,
				profileId: validateUser.account[0].profile.profileId,
				role: validateUser.account[0].role,
				permissions: validateUser.account[0].permissions,
				type: validateUser.account[0].type,
				verified: validateUser.verified
			}
			const token = this.jwtService.sign(payload, {
				expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
			})

			return {
				message: 'Token refreshed successfully',
				accessToken: token
			}
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(error.message, 'REFRESH_TOKEN_ERROR_SERVICE')
		}
	}
}
