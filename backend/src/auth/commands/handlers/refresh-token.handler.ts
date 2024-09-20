import { GeneralResponse } from '@app/types'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RefreshTokenCommand } from '../command/refresh-token.command'
import { RefreshTokenService } from '../services/refresh-token.service'

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
	constructor(private readonly refreshTokenService: RefreshTokenService) {}
	async execute(command: RefreshTokenCommand): Promise<GeneralResponse> {
		try {
			return await this.refreshTokenService.refreshToken(command.refreshToken)
		} catch (error) {
			return error
		}
	}
}
