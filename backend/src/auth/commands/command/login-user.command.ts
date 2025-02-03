import { AuthResponseDto } from '@app/auth/dto/auth-response.dto'
import { ICommand } from '@nestjs/cqrs'

export class LoginUserCommand implements ICommand {
	constructor(public readonly body: Omit<AuthResponseDto, 'accessToken' | 'refreshToken'>) {}
}
