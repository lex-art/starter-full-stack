import { configuration } from '@app/config/configuration'
import { ALLOW_UNVERIFIED } from '@app/decorator/allow-unverified.decorator'
import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/decorator'
import { CurrentUserDto } from '../dto'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	private readonly logger = new Logger(JwtAuthGuard.name)
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector
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
			const payload: CurrentUserDto = await this.jwtService.verifyAsync(token, {
				secret: configuration.jwt.secret
			})
			const dtoUserInstance = plainToClass(CurrentUserDto, payload)
			const errors = await validate(dtoUserInstance)
			if (errors.length > 0) {
				throw new UnauthorizedException({
					message: 'Invalid token payload',
					code: 'JWT_ERROR'
				})
			}

			const allowUnverified = this.reflector.getAllAndOverride<boolean>(ALLOW_UNVERIFIED, [
				context.getHandler(),
				context.getClass()
			])

			if (!allowUnverified && !dtoUserInstance.verified) {
				throw new UnauthorizedException({
					message: 'User not verified',
					code: 'JWT_ERROR'
				})
			}
			request['user'] = payload
		} catch (error: any) {
			this.logger.error(error)
			throw new UnauthorizedException({
				message: error.message,
				code: 'JWT_ERROR'
			})
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
