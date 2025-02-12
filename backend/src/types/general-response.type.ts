export interface GeneralResponse<T = Record<string, unknown>> {
	message: string
	status: number
	error?: string | Record<string, unknown>
	data: T
	[key: string]: T | string | number | boolean | Record<string, unknown>
}
