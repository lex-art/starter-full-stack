import { CurrentUserDto } from '@app/auth/dto'
import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { GeneralResponse } from '@app/types'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RefreshTokenService {
	private readonly logger = new Logger(RefreshTokenService.name)

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async refreshToken(user: CurrentUserDto): Promise<GeneralResponse> {
		try {
			const { email, userId } = user
			const validateUser = await UserEntity.findOne({
				where: { email, userId },
				relations: {
					account: {
						profile: true
					}
				}
			})
			if (!validateUser) {
				throw new AuthException('User not found', 'USER_NOT_FOUND')
			}

			const payload: CurrentUserDto = {
				userId: validateUser.userId,
				email: validateUser.email,
				accountId: validateUser.account[0].accountId,
				profileId: validateUser.account[0].profile.profileId,
				role: validateUser.account[0].role,
				permissions: validateUser.account[0].permissions,
				type: validateUser.account[0].type
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
