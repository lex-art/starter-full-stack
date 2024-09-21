import { LoginFormDto } from '@app/auth/dto'
import { IQuery } from '@nestjs/cqrs'

export class GetUserQuery implements IQuery {
	constructor(public readonly body: Pick<LoginFormDto, 'email'>) {}
}
