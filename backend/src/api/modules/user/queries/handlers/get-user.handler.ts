import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserQuery } from '../query/get-user.query'
import { UserQueryService } from '../services/user.service'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
	constructor(private readonly userQueryService: UserQueryService) {}

	async execute(query: GetUserQuery): Promise<Record<string, unknown>> {
		return await this.userQueryService.get({
			email: query.body.email
		})
	}
}
