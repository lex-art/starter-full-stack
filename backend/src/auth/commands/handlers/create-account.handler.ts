import { UserCreatedEvent } from '@app/auth/events/event/notification-email-user-created.event'
import { VerifyAccountEvent } from '@app/auth/events/event/notification-email-verify-account.even'
import { AuthException } from '@app/auth/exceptions'
import { TYPE_PROVIDER } from '@app/types/enums'
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
				const typeNotification = {
					[TYPE_PROVIDER.LOCAL]: this.eventBus.publish(
						new UserCreatedEvent(response.email, command.body.username)
					),
					[TYPE_PROVIDER.CREDENTIALS]: this.eventBus.publish(
						new VerifyAccountEvent(response.email, command.body.username)
					)
				}
				const result = typeNotification[response?.account?.provider]
				if (result instanceof Promise) {
					await result
				}
				return {
					message: 'User created successfully',
					data: response
				}
			})
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(error.message, 'CREATE_ACCOUNT_ERROR_HANDLER')
		}
	}
}
