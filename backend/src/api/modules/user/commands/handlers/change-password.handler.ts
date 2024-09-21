import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ChangePasswordCommand } from '../command/change-password.command'
import { UpdateUserService } from '../services/update-user.service'

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
	constructor(private readonly updateUserService: UpdateUserService) {}

	async execute(command: ChangePasswordCommand) {
		try {
			return await this.updateUserService.changePassword(command.body)
		} catch (error) {
			return error
		}
	}
}
