import { ProfileDto } from '@app/auth/dto/profile.dto'
import { UserDto } from '@app/auth/dto/user.dto'
import { ICommand } from '@nestjs/cqrs'

export class LoginUserCommand implements ICommand {
	constructor(public readonly body: UserDto & ProfileDto) {}
}
