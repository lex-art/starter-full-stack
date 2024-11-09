import { EmailService } from '@app/mail'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { ForgoPasswordCommand } from '../command/forgot-password.command'
import { FindUserService } from '../services/find-user.service'

@CommandHandler(ForgoPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgoPasswordCommand> {
	constructor(
		private readonly emailService: EmailService,
		private readonly findUSer: FindUserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async execute(command: ForgoPasswordCommand) {
		try {
			const user = await this.findUSer.getUser(command.email)
			const tokenForResetPass = this.jwtService.sign(
				{ idUser: user.idUser, email: user.email },
				{
					expiresIn: this.configService.get('JWT_EXPIRATION_FORGOT_PASS_TIME')
				}
			)
			const url = `${this.configService.get('FRONTEND_URL')}/auth/reset-password?token=${tokenForResetPass}`
			// TODO: still need to implement the correct template email
			return await this.emailService.sendEmail({
				email: user.email,
				from: 'app <app@app.com>',
				subject: 'Password Reset',
				data: {
					name: user.username,
					token: user.idUser,
					url
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
