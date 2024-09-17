import { UserCreatedEvent } from '@app/auth/events/event/notification-email-user.event'
import { AuthException } from '@app/auth/exceptions'
import { Logger } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '../command/create-user.command'
import { CreateUserService } from '../services/create-user.service'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	private readonly logger = new Logger(CreateUserHandler.name)
	constructor(
		private readonly eventBus: EventBus,
		private readonly createUserService: CreateUserService
	) {}

	async execute(command: CreateUserCommand) {
		try {
			return await this.createUserService.createUser(command.body).then((response) => {
				this.eventBus.publish(new UserCreatedEvent(response.user.email, command.body.userName))
				return {
					message: 'User created successfully',
					data: response
				}
			})
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(
				'Error creating user =>' + error.message,
				error?.code ?? 'ERROR_CREATING_USER'
			)
		}
	}
}
