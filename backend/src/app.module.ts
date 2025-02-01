import { AttachmentModule } from '@app/attachment'
import { FileCreationModule } from '@app/file-creation'
import { MailModule } from '@app/mail'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'
import { ApiModule } from './api/api.module'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { CustomThrottlerGuard } from './lib/Guard/throttler.guard'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: '.env'
		}),
		DatabaseModule,
		ApiModule,
		AuthModule,
		AttachmentModule,
		FileCreationModule,
		MailModule,
		// Control rate limit
		ThrottlerModule.forRoot([
			{
				name: 'short',
				ttl: 1000, // 1 second
				limit: 5
			},
			{
				name: 'medium',
				ttl: 10000, // 10 seconds
				limit: 25
			},
			{
				name: 'long',
				ttl: 60000,
				limit: 250 // 1 minute
			}
		])
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_PIPE, // global pipe
			useValue: new ValidationPipe({
				whitelist: true, // remove unknown properties
				transform: true,
				transformOptions: {
					enableImplicitConversion: true
				},
				forbidNonWhitelisted: true // throw error when unknown properties are present
			})
		},
		{
			provide: APP_GUARD,
			useClass: CustomThrottlerGuard // or => ThrottlerGuard
		}
	]
})
export class AppModule {}
