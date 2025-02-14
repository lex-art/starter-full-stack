import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		// const request = ctx.getRequest<Request>()
		const status = exception.getStatus()

		const error = exception.getResponse()

		if (typeof error === 'object' && 'status' in error && 'message' in error && 'code' in error) {
			const getStatus = isNaN(+error.status) ? 400 : +error.status
			return response.status(getStatus).json({
				status: status,
				code: error.code,
				message: (error as any).message,
				timestamp: new Date().toISOString()
			})
		}

		return response.status(status).json({
			status: status,
			code: 'UNKNOWN_ERROR',
			message: exception.message,
			timestamp: new Date().toISOString()
		})
	}
}
