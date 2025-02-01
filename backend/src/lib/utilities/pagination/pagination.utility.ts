import { PaginationQueryDto } from '@app/common/dto/query-pagination.dto'

export const mapPagination = (query: PaginationQueryDto) => ({
	data: [],
	total: 0,
	page: query?.page || 1,
	nextPage: null,
	prevPage: null,
	lastPage: 1,
	limit: query?.limit || 10,
	orderBy: query?.orderBy || 'createdAt',
	orderColumn: query?.orderColumn || 'desc'
})
