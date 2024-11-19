import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler'

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
	protected async throwThrottlingException(
		context: ExecutionContext,
		throttlerLimitDetail: ThrottlerLimitDetail
	): Promise<void> {
		// Personaliza el mensaje de error
		throw new HttpException(
			{
				statusCode: HttpStatus.TOO_MANY_REQUESTS,
				message: 'Too many requests, try again later',
				limit: throttlerLimitDetail.limit, // Opcional: incluir el límite
				remainingTime: throttlerLimitDetail.ttl // Opcional: incluir el tiempo restante
			},
			HttpStatus.TOO_MANY_REQUESTS
		)
	}
}
