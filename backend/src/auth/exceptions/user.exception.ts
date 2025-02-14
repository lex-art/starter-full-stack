export class AuthException extends Error {
	public code: string
	public message: string

	constructor(message: string, code: string) {
		super(message)
		this.message = message
		this.code = code
	}
}
