import { configuration } from '@app/config/configuration'
import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EmailService } from './mail.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: () => ({
				...configuration.mail
			})
		})
	],
	providers: [EmailService],
	exports: [EmailService]
})
export class MailModule {}
