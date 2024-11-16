import { CryptoUtility } from '@app/lib/utilities'
import { MailModule } from '@app/mail'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandHandlers } from './commands/handlers'
import { CommandServices } from './commands/services'
import { AuthController } from './controllers/auth.controller'
import { ProfileSubscriber } from './encrypt/profile.subscriber'
import { AuthEntities } from './entities'
import { EventsHandlers } from './events/handlers'
import { JwtRefreshAuthGuard } from './guard/jwt-refresh.guard'
import { JwtAuthGuard } from './guard/jwt.guard'
import { LocalAuthGuard } from './guard/local.guard'
import { RolesGuard } from './guard/role.guard'
import { TypeUserGuard } from './guard/type-user.guard'
import { QueryUserHandler } from './queries/handlers'
import { EmailVerifyService } from './queries/services/email-verify.service'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'

@Module({
	imports: [
		CqrsModule,
		TypeOrmModule.forFeature(AuthEntities),
		PassportModule,
		MailModule,
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				global: true,
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_IN') }
			}),
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [
		...CommandHandlers,
		...CommandServices,
		...QueryUserHandler,
		...EventsHandlers,
		EmailVerifyService,
		JwtStrategy,
		LocalStrategy,
		LocalAuthGuard,
		JwtRefreshAuthGuard,
		CryptoUtility,
		ProfileSubscriber,
		{
			provide: APP_GUARD, // this is to use global guard
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},
		{
			provide: APP_GUARD,
			useClass: TypeUserGuard
		}
	],
	exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
