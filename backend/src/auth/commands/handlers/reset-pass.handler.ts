import { GeneralResponse } from '@app/types'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ResetPasswordCommand } from '../command/reset-pass.command'
import { ResetPasswordService } from '../services/reset-password.service'

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
	constructor(private readonly resetPassService: ResetPasswordService) {}
	async execute(command: ResetPasswordCommand): Promise<GeneralResponse> {
		try {
			const body = command.body
			return await this.resetPassService.resetPassword({
				email: body.email,
				password: body.password,
				token: body.token,
				confirmPassword: body.confirmPassword
			})
		} catch (error) {
			return error
		}
	}
}
