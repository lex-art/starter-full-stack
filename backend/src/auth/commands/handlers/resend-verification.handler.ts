import { AuthException } from '@app/auth/exceptions'
import { EmailService } from '@app/mail'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ResendVerificationCommand } from '../command/resend-verification.command'
import { FindUserService } from '../services/find-user.service'
import { TokenVerificationService } from '../services/token-verification.service'

@CommandHandler(ResendVerificationCommand)
export class ResendVerificationHandler implements ICommandHandler<ResendVerificationCommand> {
	private readonly logger = new Logger(ResendVerificationHandler.name)

	constructor(
		private readonly findUserService: FindUserService,
		private readonly emailService: EmailService,
		private readonly tokenVerificationService: TokenVerificationService,
		private readonly configService: ConfigService
	) {}
	async execute(command: ResendVerificationCommand) {
		const body = command.body
		const user = await this.findUserService.getRawUser(body.email)
		if (user.verified) {
			throw new AuthException('User already verified', 'USER_ALREADY_VERIFIED')
		}
		if (!user.isActive) {
			throw new AuthException('User is not active', 'USER_NOT_ACTIVE')
		}
		const token = await this.tokenVerificationService.generateVerificationEmail(body.email)
		const url = `${this.configService.get<string>('URL_FRONTEND')}/auth/verify-account?token=${token}`

		await this.emailService.sendEmail({
			email: user.email,
			from: '"Support Team" <support@gmail.com>',
			subject: 'Verify your account',
			data: {
				username: user.username,
				url
			},
			template: 'user/verify-account.template.hbs'
		})

		return {
			message: 'Verification email sent successfully'
		}
	}
}
