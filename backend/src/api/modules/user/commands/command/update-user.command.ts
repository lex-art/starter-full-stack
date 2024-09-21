import { ICommand } from '@nestjs/cqrs'
import { FullUserDto } from '../../dto/user.dot'

export class UpdateUserCommand implements ICommand {
	constructor(public readonly user: FullUserDto) {}
}
