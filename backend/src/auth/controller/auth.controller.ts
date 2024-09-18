import { Public } from '@app/decorator'
import { Body, Controller, Delete, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateAccountCommand } from '../commands/command/create-account.command'
import { LoginUserCommand } from '../commands/command/login-user.command'
import { LoginFormDto } from '../dto/login.dto'
import { ProfileDto } from '../dto/profile.dto'
import { UserDto } from '../dto/user.dto'
import { AuthException } from '../exceptions'
import { LocalAuthGuard } from '../guard/local.guard'
import { GetUserQuery } from '../queries/query/get-user.query'

@Controller('auth')
export class AuthController {
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

	@Post('forgot-password')
	@Public()
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

	@Post('reset-password')
	@Public()
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

	@Post('change-password')
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

	@Post('verify-email')
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
