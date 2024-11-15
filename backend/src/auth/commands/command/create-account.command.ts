import { CreateUserDto } from '@app/auth/dto/main-user.dto'
import { ICommand } from '@nestjs/cqrs'

export class CreateAccountCommand implements ICommand {
	constructor(public readonly body: CreateUserDto) {}
}
