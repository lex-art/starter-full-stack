import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomHttpException extends HttpException {
	constructor(error: { message: string; code: string; status: HttpStatus }) {
		super(error, error.status)
	}
}
