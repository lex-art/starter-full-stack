import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

type TemplatesName =
	| 'user/new-user.template.hbs'
	| 'user/verify-email.template.hbs'
	| 'user/forgot-password.template.hbs'
	| 'user/verify-account.template.hbs'
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

	public async sendEmail({ email, from, subject, template, data }: EmailData): Promise<{
		message: string
		error?: { code: string }
		data?: Record<string, unknown>
	}> {
		return await this.mailerService
			.sendMail({
				to: email,
				from,
				subject,
				template,
				context: data
			})
			.then(() => {
				this.logger.log('[Email service] Email sent')
				return {
					message: 'Email sent'
				}
			})
			.catch((error) => {
				this.logger.error('[Email service] Error sending email =>', error)
				return {
					message: 'Error sending email',
					error: {
						code: error.message ?? 'UNKNOWN_ERROR'
					}
				}
			})
	}
}
