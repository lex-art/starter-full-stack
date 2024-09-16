import { QueryPaginationDto } from '../../dto/query.dto'

export const mapPagination = (query: QueryPaginationDto) => ({
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
