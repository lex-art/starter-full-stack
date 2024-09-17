import { Logger } from '@nestjs/common'
import { CommandHandler } from '@nestjs/cqrs'
import { LoginUserCommand } from '../command/login-user.command'
import { LoginUserService } from '../services/login-user.service'
import { AuthException } from '@app/auth/exceptions'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler {
	private readonly logger = new Logger(LoginUserHandler.name)
	constructor(private readonly loginUser: LoginUserService) {}

	async execute(command: LoginUserCommand) {
    try {
      return await this.loginUser.loginUser(command.body)
    } catch (error) {
      this.logger.error(error.message)
      throw new AuthException('Error logging in user =>' + error.message, error?.code ?? 'ERROR_LOGGING_IN_USER')
    }
  }
}
