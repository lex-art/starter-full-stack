import { EmailDto } from '@app/auth/dto'
import { ICommand } from '@nestjs/cqrs'

export class ResendOtpCommand implements ICommand {
	constructor(public readonly body: EmailDto) {}
}
