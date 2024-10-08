import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/decorator'
import { ICurrentUser } from 'src/types/user.type'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private reflector: Reflector
	) {
		super()
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (isPublic) {
			return true
		}

		//receive request
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}
		try {
			const payload: ICurrentUser = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>('JWT_SECRET')
			})
			request['user'] = payload
		} catch (error: unknown) {
			throw new UnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
