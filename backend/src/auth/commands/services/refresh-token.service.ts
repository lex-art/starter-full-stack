import { CurrentUserDto } from '@app/auth/dto'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators/user.validator'
import { configuration } from '@app/config/configuration'
import { GeneralResponse } from '@app/types'
import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { FindUserService } from './find-user.service'

@Injectable()
export class RefreshTokenService {
	private readonly logger = new Logger(RefreshTokenService.name)

	constructor(
		private readonly jwtService: JwtService,
		private readonly findUserService: FindUserService
	) {}

	async refreshToken(user: CurrentUserDto): Promise<GeneralResponse> {
		try {
			const { userId } = user
			const validateUser = await this.findUserService.getUser(userId)

			const error = Object.entries(userValidator).find(([, validator]) => validator(validateUser))
			if (error) {
				const [key] = error
				throw new AuthException(key, key.toUpperCase())
			}

			const payload: CurrentUserDto = {
				userId: validateUser.userId,
				email: validateUser.email,
				accountId: validateUser.account[0].accountId,
				profileId: validateUser.account[0].user.profile.profileId,
				verified: validateUser.verified
			}
			const token = this.jwtService.sign(payload, {
				expiresIn: configuration.jwt.secretRefresh
			})

			return {
				message: 'Token refreshed successfully',
				code: 'REFRESH_TOKEN_SUCCESS',
				accessToken: token
			}
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(error.message, 'REFRESH_TOKEN_ERROR_SERVICE')
		}
	}
}
