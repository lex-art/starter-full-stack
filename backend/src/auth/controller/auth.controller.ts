import { Public } from '@app/decorator'
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateUserCommand } from '../commands/command/create-user.command'
import { LoginUserCommand } from '../commands/command/login-user.command'
import { LoginFormDto } from '../dto/login.dto'
import { ProfileDto } from '../dto/profile.dto'
import { UserDto } from '../dto/user.dto'
import { AuthException } from '../exceptions'
import { GetUserQuery } from '../queries/query/get-user.query'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus
	) {}

	@Post('login')
	@Public()
	async login(@Body() body: LoginFormDto): Promise<{
		message: string
		data: {
			accessToken: string
			refreshToken: string
			user: UserDto & ProfileDto
		}
	}> {
		try {
			const command = new LoginUserCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}

			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('create-account')
	@Public()
	async register(@Body() body: UserDto & ProfileDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const command = new CreateUserCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			if (error instanceof AuthException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Get('resend-email')
	async resendEmail(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Get('logout')
	async logout(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Get('refresh-token')
	async refreshToken(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Get('forgot-password')
	async forgotPassword(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Get('reset-password')
	async resetPassword(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Get('change-password')
	async changePassword(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Get('verify-email')
	async verifyEmail(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	@Delete('delete-account')
	async deleteAccount(@Body() body: LoginFormDto): Promise<{
		message: string
		email: string
	}> {
		try {
			const query = new GetUserQuery(body)
			return this.queryBus.execute(query)
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}
}
