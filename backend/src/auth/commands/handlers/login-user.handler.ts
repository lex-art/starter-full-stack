import { AuthException } from '@app/auth/exceptions'
import { Logger } from '@nestjs/common'
import { CommandHandler } from '@nestjs/cqrs'
import { LoginUserCommand } from '../command/login-user.command'
import { AuthService } from '../services/auth.service'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler {
	private readonly logger = new Logger(LoginUserHandler.name)
	constructor(private readonly loginUser: AuthService) {}

	async execute(command: LoginUserCommand) {
		try {
			if (command.body.user.verified) {
				return await this.loginUser.loginUser(command.body)
			}
			return await this.loginUser.generateVerificationUser(command.body)
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(error.message, 'LOGIN_FAILED')
		}
	}
}
