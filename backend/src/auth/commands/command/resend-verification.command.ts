import { EmailDto } from '@app/auth/dto'
import { ICommand } from '@nestjs/cqrs'

export class ResendVerificationCommand implements ICommand {
	constructor(public readonly body: EmailDto) {}
}
