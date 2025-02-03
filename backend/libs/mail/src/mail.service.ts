import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { EmailException } from './exceptions'

type TemplatesName =
	| 'user/new-user.template.hbs'
	| 'user/forgot-password.template.hbs'
	| 'user/verify-account.template.hbs'
	| 'user/verify-otp.template.hbs'

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

	constructor(private mailerService: MailerService) {}

	public async sendEmail({ email, from, subject, template, data }: EmailData): Promise<{
		message: string
		error?: { code: string }
		data?: Record<string, unknown>
	}> {
		try {
			await this.mailerService.sendMail({
				to: email,
				from,
				subject,
				template,
				context: data
			})

			this.logger.log('[Email service] Email sent')
			return {
				message: 'Email sent'
			}
		} catch (error) {
			this.logger.error('[Email service] Error sending email =>', error)
			throw new EmailException('Error sending email', 'EMAIL_ERROR')
		}
	}
}
