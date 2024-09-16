import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

type TemplatesName = 'user/new-user.template.hbs' | 'user/verify-email.template.hbs'
interface EmailData {
	email: string
	from: string
	subject: string
	template: TemplatesName
	data: Record<string, unknown>
}

@Injectable()
export class EmailService {
	private readonly logger = new Logger(EmailService.name)

	constructor(
		private mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	public async sendEmail({ email, from, subject, template, data }: EmailData): Promise<void> {
		await this.mailerService
			.sendMail({
				to: email,
				from,
				subject,
				template,
				context: data
			})
			.then(() => {
				this.logger.log('[Email service] Email sent')
			})
			.catch((error) => {
				this.logger.error(error)
				throw new Error('[Email service] Error sending email =>' + error.message)
			})
	}
}
