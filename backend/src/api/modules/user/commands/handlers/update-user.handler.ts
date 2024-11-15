import { UpdateUserDto } from '@app/auth/dto/main-user.dto'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserCommand } from '../command/update-user.command'
import { UpdateUserService } from '../services/update-user.service'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
	constructor(private readonly userService: UpdateUserService) {}

	async execute(command: UpdateUserCommand): Promise<UpdateUserDto> {
		try {
			return await this.userService.update(command.user)
		} catch (error) {
			return error
		}
	}
}
