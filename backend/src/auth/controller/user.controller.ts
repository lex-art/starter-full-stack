import { Public } from '@app/decorator'
import { Body, Controller, Get, HttpException } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { LoginFormDto } from '../dto/login.dto'
import { GetUserQuery } from '../queries/query/get-user.query'

@Controller('auth/user')
export class UserController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	@Public()
	getUser(@Body() body: LoginFormDto): Promise<{
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

	/* @Get('all')
    getAllUsers(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Put('update')
    update(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('delete')
    delete(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
 */
}
