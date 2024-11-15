export interface GeneralResponse<T = Record<string, unknown>> {
	message: string
	[key: string]: T | string
}
