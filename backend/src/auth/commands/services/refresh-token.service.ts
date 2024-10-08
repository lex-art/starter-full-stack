import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { GeneralResponse } from '@app/types'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { instanceToPlain } from 'class-transformer'

@Injectable()
export class RefreshTokenService {
	private readonly logger = new Logger(RefreshTokenService.name)

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async refreshToken(refreshToken: string): Promise<GeneralResponse> {
		if (!refreshToken) {
			throw new AuthException('Refresh token is required', 'REFRESH_TOKEN_REQUIRED')
		}

		try {
			const decoded: UserEntity = this.jwtService.verify(refreshToken)
			if (!decoded) {
				throw new AuthException('Invalid refresh token', 'INVALID_REFRESH_TOKEN')
			}
			const { email, idUser } = decoded
			const validateUser = await UserEntity.findOne({
				where: { email, idUser }
			})
			if (!validateUser) {
				throw new AuthException('User not found', 'USER_NOT_FOUND')
			}
			delete validateUser.password
			const payload: Record<string, unknown> = instanceToPlain(validateUser)
			const token = this.jwtService.sign(payload, {
				expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
			})

			return {
				message: 'Token refreshed successfully',
				data: {
					accessToken: token
				}
			}
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(
				'Error refreshing token =>' + error.message,
				error?.code ?? 'ERROR_REFRESHING_TOKEN'
			)
		}
	}
}
