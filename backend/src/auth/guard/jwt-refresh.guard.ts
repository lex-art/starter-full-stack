import { configuration } from '@app/config/configuration'
import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { ICurrentUser } from 'src/types/user.type'

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt') {
	private readonly Logger = new Logger(JwtRefreshAuthGuard.name)
	constructor(private readonly jwtService: JwtService) {
		super()
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		//receive request
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}
		try {
			const payload: ICurrentUser = this.jwtService.verify(token, {
				secret: configuration.jwt.secretRefresh
			})
			request['user'] = payload
		} catch (error: any) {
			this.Logger.error(error)
			throw new UnauthorizedException({
				message: error?.message,
				code: 'INVALID_TOKEN'
			})
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Refresh' ? token : undefined
	}
}
