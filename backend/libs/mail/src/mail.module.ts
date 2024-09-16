import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { EmailService } from './mail.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: configService.get<string>('EMAIL_HOST'),
					secure: configService.get<boolean>('EMAIL_SECURE'),
					auth: {
						user: configService.get<string>('EMAIL_USER'),
						pass: configService.get<string>('EMAIL_PASSWORD')
					}
				},
				defaults: {
					from: '"No Reply" <noreply@app.com>'
				},
				template: {
					dir: join(__dirname, 'libs/mail/src/templates/'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true
					}
				}
			})
		})
	],
	providers: [EmailService],
	exports: [EmailService]
})
export class MailModule {}
