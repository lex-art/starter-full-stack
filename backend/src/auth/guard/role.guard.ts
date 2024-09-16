import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'src/decorator'
import { USER_ROLE } from 'src/types/enums'
import { ICurrentUser } from 'src/types/user.type'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<USER_ROLE[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!roles) {
			return true
		}
		const request = context.switchToHttp().getRequest()
		const user: ICurrentUser = request.user
		return roles.includes(user.rol)
	}
}
