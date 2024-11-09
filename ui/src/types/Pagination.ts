export interface Pagination<T> {
	data: Array<T>
	lastPage: number
	limit: number
	nextPage?: string
	page?: number
	prevPage?: string
	total: number
}

export interface PaginateOptions {
	lastPage?: number
	limit?: number
	nextPage?: string
	page?: number
	prevPage?: string
	total?: number
	orderBy?: string
	orderColumn?: 'asc' | 'desc' | string
}
