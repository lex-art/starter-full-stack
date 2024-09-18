import { ResetPasswordDto } from '@app/auth/dto'
import { ICommand } from '@nestjs/cqrs'

export class ResetPasswordCommand implements ICommand {
	constructor(public readonly body: ResetPasswordDto) {}
}
