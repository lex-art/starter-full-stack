import { ApiException } from '@app/api/exceptions/api.exception'
import { EmailDto, LoginFormDto } from '@app/auth/dto'
import { BaseQueryPagination } from '@app/common/dto/base-query-pagination'
import { PaginationQueryDto } from '@app/common/dto/query-pagination.dto'
import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Logger,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { SkipThrottle } from '@nestjs/throttler'
import { ChangePasswordCommand } from '../commands/command/change-password.command'
import { UpdateUserCommand } from '../commands/command/update-user.command'
import { FullUserDto } from '../dto/user.dot'
import { GetAllUserQuery } from '../queries/query/get-all-user.query'
import { GetUserQuery } from '../queries/query/get-user.query'

@SkipThrottle() // SkipThrottle is a custom decorator to skip the rate limiter, Also we can use @SkipThrottle() in the specific method (route) to skip the rate limiter
/* @Throttle({
	default: {
		limit: 10,
		ttl: 60
	}
})  */ // Throttle is a custom decorator to limit the request rate, the first parameter is the limit and the second is the time frame in seconds
@Controller('user')
export class UserController {
	private readonly logger = new Logger(UserController.name)
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	@Get('list')
	async getAllUsers(
		@Query() paginationQuery: PaginationQueryDto,
		@Query() filtersQuery: Partial<FullUserDto & BaseQueryPagination>
	) {
		try {
			const query = new GetAllUserQuery({
				paginationQuery,
				filtersQuery: filtersQuery
			})
			const result = await this.queryBus.execute(query)
			return result
		} catch (error) {
			this.logger.error(error)
			if (error instanceof ApiException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Get(':email')
	async getUser(@Param() param: EmailDto) {
		try {
			const query = new GetUserQuery(param)
			return await this.queryBus.execute(query)
		} catch (error) {
			this.logger.error(error)
			if (error instanceof ApiException) {
				throw new HttpException(error, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Patch()
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
	async changePassword(@Body() body: LoginFormDto) {
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
