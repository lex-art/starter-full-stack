import { USER_TYPE } from '@app/types/enums'
import { SetMetadata } from '@nestjs/common'

export const TYPE_USER_KEY = 'type-user'
export const TypeUSer = (...typeUser: USER_TYPE[]) => SetMetadata<string>(TYPE_USER_KEY, typeUser)
