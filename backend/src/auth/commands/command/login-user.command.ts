import { UserDto } from '@app/auth/dto/main-user.dto'
import { ICommand } from '@nestjs/cqrs'

export class LoginUserCommand implements ICommand {
	constructor(public readonly body: UserDto) {}
}
