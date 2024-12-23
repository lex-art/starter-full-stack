export interface PaginateOptions<T> {
	data: Array<T>
	total: number
	page: number
	nextPage: number | null
	prevPage: number | null
	lastPage: number
	limit: number
	orderBy: string
	orderColumn: 'asc' | 'desc'
}
/* 
export interface Pagination {
	take: number
	skip: number
	order: Record<string, 'asc' | 'desc'>
}
 */
