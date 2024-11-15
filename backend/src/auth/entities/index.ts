import { AccountEntity } from './accounts.entity'
import { ProfileEntity } from './profile.entity'
import { UserEntity } from './user.entity'
import { VerificationTokenEntity } from './verification_tokens.entity'

export * from './accounts.entity'
export * from './profile.entity'
export * from './user.entity'
export * from './verification_tokens.entity'

export const AuthEntities = [UserEntity, ProfileEntity, AccountEntity, VerificationTokenEntity]
