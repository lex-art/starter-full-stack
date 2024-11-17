import { LoginFormDto } from '@app/auth/dto'
import { ICommand } from '@nestjs/cqrs'

export class ChangePasswordCommand implements ICommand {
	constructor(public readonly body: LoginFormDto) {}
}
