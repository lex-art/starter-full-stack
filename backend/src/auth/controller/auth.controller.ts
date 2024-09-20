import { Public } from '@app/decorator'
import {
	Body,
	Controller,
	Delete,
	HttpException,
	HttpStatus,
	Logger,
	Post,
	Request,
	UseGuards
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateAccountCommand } from '../commands/command/create-account.command'
import { DeleteAccountCommand } from '../commands/command/delete-account.command'
import { EmailVerifyOtpCommand } from '../commands/command/email-verify-otp.command'
import { LoginUserCommand } from '../commands/command/login-user.command'
import { RefreshTokenCommand } from '../commands/command/refresh-token.command'
import { ResetPasswordCommand } from '../commands/command/reset-pass.command'
import { RefreshTokenDto, ResetPasswordDto, VerifyEmailOtpDto } from '../dto'
import { LoginFormDto } from '../dto/login.dto'
import { ProfileDto } from '../dto/profile.dto'
import { UserDto } from '../dto/user.dto'
import { AuthException } from '../exceptions'
import { LocalAuthGuard } from '../guard/local.guard'
import { ForgoPasswordCommand } from './../commands/command/forgot-password.command'

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name)
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus
	) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: { user: UserDto & ProfileDto }): Promise<{
		message: string
		data: {
			accessToken: string
			refreshToken: string
		}
	}> {
		try {
			const command = new LoginUserCommand(req.user)
			return await this.commandBus.execute(command)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}

			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('register')
	@Public()
	async register(@Body() body: UserDto & ProfileDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new CreateAccountCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('logout')
	async logout(): Promise<{
		message: string
	}> {
		return {
			message: 'This method is not implemented yet'
		}
	}

	@Post('refresh-token')
	async refreshToken(@Body() body: RefreshTokenDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new RefreshTokenCommand(body.refreshToken)
			return await this.commandBus.execute(command)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('forgot-password')
	@Public()
	async forgotPassword(@Body() body: Pick<LoginFormDto, 'email'>): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new ForgoPasswordCommand(body.email)
			return await this.commandBus.execute(command)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('reset-password')
	@Public()
	async resetPassword(@Body() body: ResetPasswordDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new ResetPasswordCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('verify-email')
	async verifyEmail(@Body() body: VerifyEmailOtpDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new EmailVerifyOtpCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Delete('delete-account')
	async deleteAccount(@Body() body: Pick<LoginFormDto, 'email'>): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new DeleteAccountCommand(body.email)
			return this.commandBus.execute(command)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}
}
