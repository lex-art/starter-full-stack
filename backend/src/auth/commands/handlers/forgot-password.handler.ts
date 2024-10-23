import { EmailService } from '@app/mail'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ForgoPasswordCommand } from '../command/forgot-password.command'
import { FindUserService } from '../services/find-user.service'

@CommandHandler(ForgoPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgoPasswordCommand> {
	constructor(
		private readonly emailService: EmailService,
		private readonly findUSer: FindUserService
	) {}

	async execute(command: ForgoPasswordCommand) {
		try {
			const user = await this.findUSer.getUser(command.email)
			// TODO: still need to implement the correct template email
			return await this.emailService.sendEmail({
				email: user.email,
				from: 'app <app@app.com>',
				subject: 'Password Reset',
				data: {
					name: user.userName,
					token: user.idUser,
					url: 'http://localhost:3000/auth/reset-password'
				},
				template: 'user/forgot-password.template.hbs'
			})
		} catch (error) {
			return {
				message: 'Error sending email from here',
				error: {
					code: error?.message ?? 'UNKNOWN_ERROR'
				}
			}
		}
	}
}
