import { FindUserService } from '@app/auth/commands/services/find-user.service'
import { AuthException } from '@app/auth/exceptions'
import { EmailService } from '@app/mail'
import { GeneralResponse } from '@app/types'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ResendOtpCommand } from '../command/resend-otp.command'
import { TokenVerificationService } from '../services/token-verification.service'

@CommandHandler(ResendOtpCommand)
export class ResendOtpHandler implements ICommandHandler<ResendOtpCommand> {
	constructor(
		private readonly findUserService: FindUserService,
		private readonly tokenVerificationService: TokenVerificationService,
		private readonly emailService: EmailService
	) {}

	async execute(command: ResendOtpCommand): Promise<GeneralResponse> {
		const user = await this.findUserService.getRawUser(command.body.email)
		if (user.verified) {
			throw new AuthException('User already verified', 'USER_ALREADY_VERIFIED')
		}
		if (!user.isActive) {
			throw new AuthException('User is not active', 'USER_NOT_ACTIVE')
		}

		const generateOtp = await this.tokenVerificationService.generateOTP(command.body.email)
		const otp = generateOtp.otp
		await this.emailService.sendEmail({
			email: user.email,
			from: '"Support Team" <support@gmail.com>',
			subject: 'Verify your account',
			data: {
				username: user.username,
				otp_1: otp[0],
				otp_2: otp[1],
				otp_3: otp[2],
				otp_4: otp[3],
				otp_5: otp[4],
				otp_6: otp[5]
			},
			template: 'user/verify-otp.template.hbs'
		})
		return {
			message: 'OTP sent successfully'
		}
	}
}
