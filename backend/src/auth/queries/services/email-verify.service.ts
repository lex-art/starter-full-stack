import { VerificationTokenEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class EmailVerifyService {
	private readonly logger = new Logger(EmailVerifyService.name)
	constructor(private readonly jwtService: JwtService) {}

	async verify(token: string): Promise<boolean> {
		try {
			const { email } = this.jwtService.verify(token)
			const tokenValidation = await VerificationTokenEntity.findOne({
				where: {
					identifier: email
				}
			})

			if (!tokenValidation) {
				throw new AuthException('Token not found', 'TOKEN_NOT_FOUND')
			}

			if (tokenValidation.token !== token) {
				throw new AuthException('Token not valid', 'TOKEN_NOT_VALID')
			}
			if (tokenValidation.expires < new Date()) {
				throw new AuthException('Token expired', 'TOKEN_EXPIRED')
			}

			if (tokenValidation.isUsed) {
				throw new AuthException('Token already used ', 'TOKEN_USED')
			}

			tokenValidation.isUsed = true
			await tokenValidation.save()
			return true
		} catch (error) {
			this.logger.error(error)
			throw new AuthException(error.message, 'EMAIL_VERIFY_ERROR_HANDLER')
		}
	}
}
