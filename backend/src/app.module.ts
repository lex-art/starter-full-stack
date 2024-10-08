import { AttachmentModule } from '@app/attachment'
import { FileCreationModule } from '@app/file-creation'
import { MailModule } from '@app/mail'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { ApiModule } from './api/api.module'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'

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
		MailModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				transform: true,
				transformOptions: {
					enableImplicitConversion: true
				},
				forbidNonWhitelisted: true
			})
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
	]
})
export class AppModule {}
