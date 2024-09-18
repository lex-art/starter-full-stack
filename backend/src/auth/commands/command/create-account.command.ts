import { ProfileDto } from '@app/auth/dto/profile.dto'
import { ICommand } from '@nestjs/cqrs'
import { UserDto } from '../../../auth/dto/user.dto'

export class CreateAccountCommand implements ICommand {
	constructor(public readonly body: UserDto & ProfileDto) {}
}
