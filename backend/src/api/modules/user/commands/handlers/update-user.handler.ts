import { GeneralResponse } from '@app/types'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserCommand } from '../command/update-user.command'
import { UpdateUserService } from '../services/update-user.service'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
	constructor(private readonly userService: UpdateUserService) {}

	async execute(command: UpdateUserCommand): Promise<GeneralResponse> {
		try {
			return await this.userService.update(command.user)
		} catch (error) {
			return error
		}
	}
}
