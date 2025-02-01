import { BaseQueryPagination } from '@app/common/dto/base-query-pagination'
import { PaginationQueryDto } from '@app/common/dto/query-pagination.dto'
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
