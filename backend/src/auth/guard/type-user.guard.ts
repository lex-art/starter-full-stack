import { TYPE_USER_KEY } from '@app/decorator/type-user.decorator'
import { USER_TYPE } from '@app/types/enums'
import { ICurrentUser } from '@app/types/user.type'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class TypeUserGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const typeUser = this.reflector.getAllAndOverride<USER_TYPE[]>(TYPE_USER_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!typeUser) {
			return true
		}
		const request = context.switchToHttp().getRequest()
		const user: ICurrentUser = request.user
		return typeUser.includes(user.type)
	}
}
