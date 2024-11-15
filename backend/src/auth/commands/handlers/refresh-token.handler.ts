import { AuthException } from '@app/auth/exceptions'
import { GeneralResponse } from '@app/types'
import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RefreshTokenCommand } from '../command/refresh-token.command'
import { RefreshTokenService } from '../services/refresh-token.service'

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
	private readonly logger = new Logger(RefreshTokenHandler.name)
	constructor(private readonly refreshTokenService: RefreshTokenService) {}
	async execute(command: RefreshTokenCommand): Promise<GeneralResponse> {
		try {
			return await this.refreshTokenService.refreshToken(command.user)
		} catch (error) {
			this.logger.error(error)
			throw new AuthException(error.message, 'REFRESH_TOKEN_ERROR_HANDLER')
		}
	}
}
