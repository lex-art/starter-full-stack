import { CurrentUser, Public } from '@app/decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Logger,
	Post,
	Query,
	Request,
	Res,
	UseGuards
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Response } from 'express'
import { CreateAccountCommand } from '../commands/command/create-account.command'
import { DeleteAccountCommand } from '../commands/command/delete-account.command'
import { ForgoPasswordCommand } from '../commands/command/forgot-password.command'
import { LoginUserCommand } from '../commands/command/login-user.command'
import { RefreshTokenCommand } from '../commands/command/refresh-token.command'
import { ResetPasswordCommand } from '../commands/command/reset-pass.command'
import { ResetPasswordDto, TokenDto } from '../dto'
import { EmailDto, LoginFormDto } from '../dto/login.dto'
import { CreateUserDto, CurrentUserDto, UserDto } from '../dto/main-user.dto'
import { AuthException } from '../exceptions'
import { JwtRefreshAuthGuard } from '../guard/jwt-refresh.guard'
import { LocalAuthGuard } from '../guard/local.guard'
import { VerifyAccountQuery } from '../queries/query/verify-account.query'

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name)
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
		private readonly configService: ConfigService
	) {}

	handleGeneralException(error: any): HttpException {
		this.logger.error(error)
		if (error instanceof AuthException) {
			return new HttpException(
				{
					message: error.message,
					code: error.code
				},
				HttpStatus.BAD_REQUEST
			)
		}
		return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
	}

	@Post('login')
	@Public()
	@UseGuards(LocalAuthGuard)
	async login(
		@Request()
		req: {
			user: UserDto
		}
	): Promise<{
		accessToken: string
		refreshToken: string
		user: UserDto
	}> {
		try {
			const command = new LoginUserCommand(req.user)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	// this method when the app need to register a new user without an admin
	@Post('register')
	@Public()
	//@UseGuards(AuthGuard('jwt')) // this is an example of how to use jwt guard
	async register(@Body() body: CreateUserDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new CreateAccountCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
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
	@Public()
	@UseGuards(JwtRefreshAuthGuard)
	async refreshToken(@CurrentUser() user: CurrentUserDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new RefreshTokenCommand(user)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@Post('forgot-password')
	@Public()
	async forgotPassword(@Body() body: EmailDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new ForgoPasswordCommand(body.email)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@Post('reset-password')
	@Public()
	async resetPassword(
		@Body() body: ResetPasswordDto,
		@Query() params: TokenDto
	): Promise<{
		message: string
		email: string
	}> {
		try {
			body.token = params.token
			const command = new ResetPasswordCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@Get('verify-account')
	@Public()
	async verifyEmail(@Query() token: TokenDto, @Res() res: Response) {
		try {
			const command = new VerifyAccountQuery(token)
			const verified = await this.queryBus.execute(command)
			if (verified) {
				return res.redirect(
					this.configService.get('URL_FRONTEND') + '/auth/login?message=account_verified'
				)
			}
			return res.redirect(
				this.configService.get('URL_FRONTEND') + '/auth/login?message=account_not_verified'
			)
		} catch (error) {
			throw this.handleGeneralException(error)
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
			throw this.handleGeneralException(error)
		}
	}
}
