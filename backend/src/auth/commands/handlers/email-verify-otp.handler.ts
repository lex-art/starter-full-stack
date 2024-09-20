import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { EmailVerifyOtpCommand } from '../command/email-verify-otp.command'
import { EmailVerifyOtpService } from './../services/email-verify-otp.service'

@CommandHandler(EmailVerifyOtpCommand)
export class EmailVerifyOtpHandler implements ICommandHandler<EmailVerifyOtpCommand> {
	constructor(private readonly emailVerifyOtpService: EmailVerifyOtpService) {}

	async execute(command: EmailVerifyOtpCommand) {
		try {
			const body = command.body
			return await this.emailVerifyOtpService.verifyOtp(body.email, body.otp)
		} catch (error) {
			return error
		}
	}
}
