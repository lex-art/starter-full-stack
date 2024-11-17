import { TokenVerificationService } from '@app/auth/commands/services/token-verification.service'
import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class EmailVerifyService {
	private readonly logger = new Logger(EmailVerifyService.name)
	constructor(
		private readonly jwtService: JwtService,
		private readonly tokenVerificationService: TokenVerificationService
	) {}

	async verify(token: string): Promise<boolean> {
		try {
			const { email } = this.jwtService.verify(token)
			if (!email) {
				throw new AuthException('Invalid token', 'INVALID_TOKEN')
			}
			await this.tokenVerificationService.verificationEmail(email, token)
			const user = await UserEntity.findOne({
				where: { email }
			})

			if (!user) {
				throw new AuthException('This user does not own this token', 'TOKEN_USER_MISMATCH')
			}

			user.verified = true
			await user.save()
			return true
		} catch (error) {
			this.logger.error(error)
			throw new AuthException(error.message, 'EMAIL_VERIFY_ERROR_HANDLER')
		}
	}
}
