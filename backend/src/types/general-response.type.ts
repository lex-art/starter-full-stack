export interface GeneralResponse<T = Record<string, unknown>> {
	message: string
	data: T
}
