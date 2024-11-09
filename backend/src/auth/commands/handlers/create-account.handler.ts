import { UserCreatedEvent } from '@app/auth/events/event/notification-email-user.event'
import { Logger } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { CreateAccountCommand } from '../command/create-account.command'
import { CreateUserService } from '../services/create-user.service'

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
	private readonly logger = new Logger(CreateAccountHandler.name)
	constructor(
		private readonly eventBus: EventBus,
		private readonly createUserService: CreateUserService
	) {}

	async execute(command: CreateAccountCommand) {
		try {
			return await this.createUserService.createUser(command.body).then(async (response) => {
				await this.eventBus.publish(new UserCreatedEvent(response.user.email, command.body.username))
				return {
					message: 'User created successfully',
					data: response
				}
			})
		} catch (error) {
			this.logger.error(error.message)
			return error
		}
	}
}
