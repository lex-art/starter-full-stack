import { VerifyEmailOtpDto } from '@app/auth/dto'
import { ICommand } from '@nestjs/cqrs'

export class VerifyOtpCommand implements ICommand {
	constructor(public readonly body: VerifyEmailOtpDto) {}
}
