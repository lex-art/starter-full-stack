import { Logger } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from '../query/get-user.query'
import { GetUserService } from '../services/get-user.service'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
	private readonly logger = new Logger(GetUserHandler.name)
	constructor(private readonly GetUserService: GetUserService) {}

	async execute(query: GetUserQuery) {
		try {
			/* return await this.GetUserService.getUser(query.body).then(response => {
                return  {
                    message: 'User found successfully',
                    data: response
                }
            }); */
		} catch (error) {
			this.logger.error(error.message)
			throw new Error('Error consulting =>' + error.message)
		}
	}
}
