import { CustomHttpException } from '@app/common/exceptions/custom-http.exception'
import { envs } from '@app/config/env/envs'
import { CurrentUser, Public } from '@app/decorator'
import { AllowUnverified } from '@app/decorator/allow-unverified.decorator'
import { GeneralResponse } from '@app/types'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Logger,
	Post,
	Query,
	Request,
	Res,
	UseGuards
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SkipThrottle, Throttle } from '@nestjs/throttler'
import { Response } from 'express'
import { CreateAccountCommand } from '../commands/command/create-account.command'
import { DeleteAccountCommand } from '../commands/command/delete-account.command'
import { ForgoPasswordCommand } from '../commands/command/forgot-password.command'
import { LoginUserCommand } from '../commands/command/login-user.command'
import { RefreshTokenCommand } from '../commands/command/refresh-token.command'
import { ResendOtpCommand } from '../commands/command/resend-otp.command'
import { ResendVerificationCommand } from '../commands/command/resend-verification.command'
import { ResetPasswordCommand } from '../commands/command/reset-pass.command'
import { VerifyOtpCommand } from '../commands/command/verify-otp.command'
import { ResetPasswordDto, TokenDto, VerifyEmailOtpDto } from '../dto'
import { AuthResponseDto } from '../dto/auth-response.dto'
import { EmailDto } from '../dto/login.dto'
import { CreateUserDto, CurrentUserDto, UserDto } from '../dto/main-user.dto'
import { AuthException } from '../exceptions'
import { JwtRefreshAuthGuard } from '../guard/jwt-refresh.guard'
import { LocalAuthGuard } from '../guard/local.guard'
import { VerifyAccountQuery } from '../queries/query/verify-account.query'

@ApiTags('Auth') // this is for swagger documentation
@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name)
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus
	) {}

	handleGeneralException(error: any): HttpException {
		this.logger.error(error)
		if (error instanceof AuthException) {
			throw new CustomHttpException({
				message: error.message,
				code: error.code,
				status: HttpStatus.UNAUTHORIZED
			})
		}

		throw new CustomHttpException({
			message: error.message,
			code: 'UNKNOWN_ERROR',
			status: HttpStatus.INTERNAL_SERVER_ERROR
		})
	}

	@Throttle({
		default: {
			limit: 5,
			ttl: 60
		}
	})
	@Throttle({
		default: {
			limit: 20,
			ttl: 3600
		}
	})
	@Post('login')
	@HttpCode(HttpStatus.OK)
	@Public()
	@UseGuards(LocalAuthGuard)
	async login(
		@Request()
		req: {
			user: Omit<AuthResponseDto, 'accessToken' | 'refreshToken'>
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

	@ApiOperation({
		summary: 'Register a new user',
		description: 'This is the method to register a new user without an admin'
	})
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
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

	@SkipThrottle()
	@Post('refresh-token')
	@HttpCode(HttpStatus.CREATED)
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

	@Throttle({
		default: {
			limit: 5,
			ttl: 60
		}
	})
	@Throttle({
		default: {
			limit: 20,
			ttl: 3600
		}
	})
	@Post('forgot-password')
	@HttpCode(HttpStatus.OK)
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
	@HttpCode(HttpStatus.OK)
	@Public()
	async resetPassword(@Body() body: ResetPasswordDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new ResetPasswordCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@Delete('delete-account')
	@Public()
	async deleteAccount(@Body() body: EmailDto): Promise<{
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

	@ApiOperation({
		summary: 'Verify account by email',
		description:
			'This is the one of the method to verify account by email, the other is by OTP (One Time Password) by email'
	})
	@ApiBody({
		type: TokenDto
	})
	@ApiResponse({
		status: 200,
		description: 'The account has been verified successfully'
	})
	@Get('verify-account')
	@Public()
	async verifyEmail(@Query() token: TokenDto, @Res() res: Response) {
		try {
			const command = new VerifyAccountQuery(token)
			const verified = await this.queryBus.execute(command)
			if (verified) {
				return res.redirect(envs.URL_FRONTEND + '/auth/login?message=account_verified')
			}
			return res.redirect(envs.URL_FRONTEND + '/auth/login?message=account_not_verified')
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@Throttle({
		default: {
			limit: 1,
			ttl: 60 * 15 // 15 minutes
		}
	})
	@Post('resend-verification')
	@Public()
	async resendVerification(@Body() body: EmailDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new ResendVerificationCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@ApiOperation({
		summary: 'Verify account by OTP',
		description:
			'This is the one of the method to verify account by OTP (One Time Password) by email, the other is by email verification'
	})
	@ApiBody({
		type: VerifyEmailOtpDto
	})
	@ApiResponse({
		status: 200,
		description: 'The account has been verified successfully'
	})
	@Post('verify-otp')
	@AllowUnverified()
	async verifyOtp(@Body() body: VerifyEmailOtpDto): Promise<GeneralResponse> {
		try {
			const command = new VerifyOtpCommand(body)
			const verified = await this.commandBus.execute(command)
			if (verified) {
				return {
					code: 'VERIFIED',
					message: 'OTP verified successfully'
				}
			}
			return {
				code: 'NOT_VERIFIED',
				message: 'OTP verification failed',
				error: {
					message: 'OTP verification failed',
					code: 'OTP_VERIFICATION_FAILED'
				}
			}
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}

	@Throttle({
		default: {
			limit: 1,
			ttl: 60 * 15 // 15 minutes
		}
	})
	@Post('resend-otp')
	@AllowUnverified()
	async resendOtp(@Body() body: EmailDto): Promise<GeneralResponse> {
		try {
			const command = new ResendOtpCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			throw this.handleGeneralException(error)
		}
	}
}
