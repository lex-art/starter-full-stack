import { EmailService } from '@app/mail'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserCreatedEvent } from '../event/notification-email-user.event'

@EventsHandler(UserCreatedEvent)
export class NotificationEmailUserHandler implements IEventHandler<UserCreatedEvent> {
	constructor(private readonly emailService: EmailService) {}

	async handle(event: UserCreatedEvent) {
		return this.emailService.sendEmail({
			email: event.email,
			from: '"Support Team" <support@gmail.com>',
			subject: 'Welcome to the platform',
			data: {
				username: event.username
			},
			template: 'user/new-user.template.hbs'
		})
	}
}
