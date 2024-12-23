import { NotificationEmailOTPEvent } from '@app/auth/events/event/notification-email-otp-verify.event'
import { UserCreatedEvent } from '@app/auth/events/event/notification-email-user-created.event'
import { VerifyAccountEvent } from '@app/auth/events/event/notification-email-verify-account.even'
import { AuthException } from '@app/auth/exceptions'
import { TYPE_PROVIDER } from '@app/types/enums'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { CreateAccountCommand } from '../command/create-account.command'
import { CreateUserService } from '../services/create-user.service'
import { TokenVerificationService } from '../services/token-verification.service'

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
	private readonly logger = new Logger(CreateAccountHandler.name)
	constructor(
		private readonly eventBus: EventBus,
		private readonly createUserService: CreateUserService,
		private readonly tokenVerificationService: TokenVerificationService,
		private readonly configService: ConfigService
	) {}

	async execute(command: CreateAccountCommand) {
		try {
			return await this.createUserService.createUser(command.body).then(async (response) => {
				if (response.account.provider === TYPE_PROVIDER.LOCAL) {
					await this.eventBus.publish(
						new UserCreatedEvent(response.email, {
							username: response.username,
							password: response.password,
							url: this.configService.get<string>('URL_FRONTEND')
						})
					)
				} else if (response.account.provider === TYPE_PROVIDER.CREDENTIALS) {
					// This flag would be in another place or method of flagMethodVerify
					const flagMethodVerify = this.configService.get<string>('FLAG_METHOD_VERIFY')
					if (flagMethodVerify === 'OTP') {
						const generateOtp = await this.tokenVerificationService.generateOTP(response.email)
						await this.eventBus.publish(
							new NotificationEmailOTPEvent(response.email, {
								username: response.username,
								otp: generateOtp.otp
							})
						)
					} else {
						const token = await this.tokenVerificationService.generateVerificationEmail(
							response.email
						)
						const url = `${this.configService.get<string>('URL_FRONTEND')}/auth/verify-account?token=${token}`
						await this.eventBus.publish(
							new VerifyAccountEvent(response.email, {
								username: response.username,
								url
							})
						)
					}
				}
				delete response.password
				return {
					message: 'User created successfully',
					user: response
				}
			})
		} catch (error) {
			this.logger.error(error.message)
			throw new AuthException(error.message, 'CREATE_ACCOUNT_ERROR_HANDLER')
		}
	}
}
