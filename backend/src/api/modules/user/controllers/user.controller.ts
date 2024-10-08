import { ApiException } from '@app/api/exceptions/api.exception'
import { LoginFormDto, ResetPasswordDto } from '@app/auth/dto'
import { BaseQueryPagination } from '@app/lib/dto/base-query-pagination'
import { PaginationQueryDto } from '@app/lib/dto/query-pagination.dto'
import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ChangePasswordCommand } from '../commands/command/change-password.command'
import { UpdateUserCommand } from '../commands/command/update-user.command'
import { FullUserDto } from '../dto/user.dot'
import { GetAllUserQuery } from '../queries/query/get-all-user.query'
import { GetUserQuery } from '../queries/query/get-user.query'

@Controller('user')
export class UserController {
	private readonly logger = new Logger(UserController.name)
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	@Get()
	async getUser(@Body() body: Pick<LoginFormDto, 'email'>) {
		try {
			const query = new GetUserQuery(body)
			return await this.queryBus.execute(query)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof ApiException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Get('all')
	async getAllUsers(
		@Query() paginationQuery: PaginationQueryDto,
		@Query() filtersQuery: Partial<FullUserDto & BaseQueryPagination>
	) {
		try {
			const query = new GetAllUserQuery({
				paginationQuery,
				filtersQuery: filtersQuery
			})
			return await this.queryBus.execute(query)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof ApiException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post()
	async updateUser(@Body() body: FullUserDto) {
		try {
			const command = new UpdateUserCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof ApiException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('change-password')
	async changePassword(@Body() body: Pick<ResetPasswordDto, 'password' | 'email'>) {
		try {
			const command = new ChangePasswordCommand(body)
			return await this.commandBus.execute(command)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof ApiException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
