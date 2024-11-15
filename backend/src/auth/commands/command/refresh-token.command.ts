import { CurrentUserDto } from '@app/auth/dto'
import { ICommand } from '@nestjs/cqrs'

export class RefreshTokenCommand implements ICommand {
	constructor(public readonly user: CurrentUserDto) {}
}
