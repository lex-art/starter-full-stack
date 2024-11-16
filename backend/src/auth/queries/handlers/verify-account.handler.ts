import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { VerifyAccountQuery } from '../query/verify-account.query'
import { EmailVerifyService } from '../services/email-verify.service'

@QueryHandler(VerifyAccountQuery)
export class VerifyAccountHandler implements IQueryHandler<VerifyAccountQuery> {
	constructor(private readonly emailVerifyService: EmailVerifyService) {}

	async execute(query: VerifyAccountQuery): Promise<Promise<any>> {
		console.log('====================================')
		console.log('VerifyAccountHandler -> execute -> query', query.body.token)
		console.log('====================================')

		return await this.emailVerifyService.verify(query.body.token)
	}
}
