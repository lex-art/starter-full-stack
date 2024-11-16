import { TokenDto } from '@app/auth/dto'
import { IQuery } from '@nestjs/cqrs'

export class VerifyAccountQuery implements IQuery {
	constructor(public readonly body: TokenDto) {}
}
