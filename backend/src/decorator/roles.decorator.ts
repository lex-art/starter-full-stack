import { SetMetadata } from '@nestjs/common'
import { USER_ROLE } from 'src/types/enums/user-role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: USER_ROLE[]) => SetMetadata<string>(ROLES_KEY, roles)
