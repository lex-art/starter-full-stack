export class EmailException extends Error {
	public code: string
	public message: string

	constructor(message: string, code: string) {
		super(message)
		this.code = code
	}
}
