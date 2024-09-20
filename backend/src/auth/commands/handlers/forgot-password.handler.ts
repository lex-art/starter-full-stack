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
			this.emailService.sendEmail({
				email: user.email,
				from: 'app <app@app.com>',
				subject: 'Password Reset',
				data: {
					name: user.userName,
					token: user.idUser
				},
				template: 'user/verify-email.template.hbs'
			})
		} catch (error) {
			return error
		}
	}
}
