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
			return await this.loginUser.loginUser(command.body)
		} catch (error) {
			this.logger.error(error.message)
			return error
		}
	}
}