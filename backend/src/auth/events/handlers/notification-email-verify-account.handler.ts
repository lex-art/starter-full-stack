import { EmailService } from '@app/mail'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { VerifyAccountEvent } from '../event/notification-email-verify-account.even'

@EventsHandler(VerifyAccountEvent)
export class NotificationVerifyAccountHandler implements IEventHandler<VerifyAccountEvent> {
	constructor(private readonly emailService: EmailService) {}

	async handle(event: VerifyAccountEvent) {
		return this.emailService.sendEmail({
			email: event.email,
			from: '"Support Team" <support@gmail.com>',
			subject: 'Welcome to the platform',
			data: {
				username: event.data.username,
				url: event.data.url
			},
			template: 'user/verify-account.template.hbs'
		})
	}
}
