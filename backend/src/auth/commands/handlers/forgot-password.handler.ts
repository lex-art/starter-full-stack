import { AuthException } from '@app/auth/exceptions'
import { EmailService } from '@app/mail'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ForgoPasswordCommand } from '../command/forgot-password.command'
import { FindUserService } from '../services/find-user.service'
import { TokenVerificationService } from '../services/token-verification.service'

@CommandHandler(ForgoPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgoPasswordCommand> {
	private readonly logger = new Logger(ForgotPasswordHandler.name)
	constructor(
		private readonly emailService: EmailService,
		private readonly findUSer: FindUserService,
		private readonly configService: ConfigService,
		private readonly tokenVerificationService: TokenVerificationService
	) {}

	async execute(command: ForgoPasswordCommand) {
		try {
			const user = await this.findUSer.getUser(command.email)
			const tokenForResetPass = await this.tokenVerificationService.generateVerificationResetPassword(
				user.email
			)
			const url = `${this.configService.get('URL_FRONTEND')}/auth/reset-password?token=${tokenForResetPass}`

			return await this.emailService.sendEmail({
				email: user.email,
				from: 'app <app@app.com>',
				subject: 'Password Reset',
				data: {
					username: user.username,
					url
				},
				template: 'user/forgot-password.template.hbs'
			})
		} catch (error) {
			this.logger.error(error)
			throw new AuthException(error.message, 'FORGOT_PASSWORD_ERROR_HANDLER')
		}
	}
}
