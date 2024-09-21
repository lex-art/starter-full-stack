import { BaseQueryPagination } from '@app/lib/dto/base-query-pagination'
import { PaginationQueryDto } from '@app/lib/dto/query-pagination.dto'
import { IQuery } from '@nestjs/cqrs'
import { FullUserDto } from '../../dto/user.dot'

export class GetAllUserQuery implements IQuery {
	constructor(
		public readonly body: {
			paginationQuery: PaginationQueryDto
			filtersQuery: Partial<FullUserDto & BaseQueryPagination>
		}
	) {}
}
