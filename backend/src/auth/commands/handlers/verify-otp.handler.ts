import { AuthException } from '@app/auth/exceptions'
import { GeneralResponse } from '@app/types'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { VerifyOtpCommand } from '../command/verify-otp.command'
import { FindUserService } from '../services/find-user.service'
import { TokenVerificationService } from '../services/token-verification.service'

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
	constructor(
		private readonly tokenVerificationService: TokenVerificationService,
		private readonly findUserService: FindUserService
	) {}

	async execute(command: VerifyOtpCommand): Promise<GeneralResponse> {
		const result = await this.tokenVerificationService.verifyOTP(command.body)
		if (!result) {
			throw new AuthException('OTP verification failed', 'OTP_VERIFICATION_FAILED')
		}
		const user = await this.findUserService.getRawUser(command.body.email)
		if (user.verified) {
			throw new AuthException('OTP verification failed', 'OTP_VERIFICATION_FAILED')
		}
		user.verified = true
		await user.save()
		return {
			message: 'OTP verification failed',
			verified: false
		}
	}
}
