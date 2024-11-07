import { ICommand } from '@nestjs/cqrs'
import { RegisterUserDto } from '../../../auth/dto/user.dto'

export class CreateAccountCommand implements ICommand {
	constructor(public readonly body: RegisterUserDto) {}
}
