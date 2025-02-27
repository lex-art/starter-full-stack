export interface GeneralResponse<T = Record<string, unknown>> {
	message: string
	code: string
	error?: string | Record<string, unknown>
	data?: T
	[key: string]:
		| T
		| string
		| number
		| boolean
		| Record<string, unknown>
		| undefined
}
