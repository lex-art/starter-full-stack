import { EmailService } from '@app/mail'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { NotificationEmailOTPEvent } from '../event/notification-email-otp-verify.event'

@EventsHandler(NotificationEmailOTPEvent)
export class NotificationEmailOTPVerifyHandler implements IEventHandler<NotificationEmailOTPEvent> {
	constructor(private readonly emailService: EmailService) {}

	async handle(event: NotificationEmailOTPEvent) {
		return this.emailService.sendEmail({
			email: event.email,
			from: '"Support Team" <support@gmail.com>',
			subject: 'Verify your account',
			data: {
				username: event.data.username,
				otp_1: event.data.otp[0],
				otp_2: event.data.otp[1],
				otp_3: event.data.otp[2],
				otp_4: event.data.otp[3],
				otp_5: event.data.otp[4],
				otp_6: event.data.otp[5]
			},
			template: 'user/verify-otp.template.hbs'
		})
	}
}
