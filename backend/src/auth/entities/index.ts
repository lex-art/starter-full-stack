import { ProfileEntity } from './profile.entity'
import { UserEntity } from './user.entity'

export * from './profile.entity'
export * from './user.entity'

export const AuthEntities = [UserEntity, ProfileEntity]
