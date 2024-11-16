import { AuthException } from '@app/auth/exceptions'
import { GeneralResponse } from '@app/types'
import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ResetPasswordCommand } from '../command/reset-pass.command'
import { ResetPasswordService } from '../services/reset-password.service'

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
	private readonly logger = new Logger(ResetPasswordHandler.name)
	constructor(private readonly resetPassService: ResetPasswordService) {}
	async execute(command: ResetPasswordCommand): Promise<GeneralResponse> {
		try {
			const body = command.body
			return await this.resetPassService.resetPassword({
				password: body.password,
				token: body.token,
				confirmPassword: body.confirmPassword
			})
		} catch (error) {
			this.logger.error(error)
			throw new AuthException(error.message, 'RESET_PASSWORD_ERROR_HANDLER')
		}
	}
}
