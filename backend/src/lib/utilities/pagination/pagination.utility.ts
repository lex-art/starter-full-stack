import { PaginationQueryDto } from '@app/lib/dto/query-pagination.dto'

export const mapPagination = (query: PaginationQueryDto) => ({
	data: [],
	total: 0,
	page: query.page,
	nextPage: null,
	prevPage: null,
	lastPage: 1,
	limit: query.limit,
	orderBy: query.orderBy,
	orderColumn: query.orderColumn
})
