import { UserEntity } from '@app/auth/entities'

const userValidator = {
	user_not_exist: (user: UserEntity) => !user,
	account_not_exist: (user: UserEntity) => !user?.account?.length,
	account_not_active: (user: UserEntity) => !user.isActive,
	user_not_verified: (user: UserEntity) => !user.verified
}

export { userValidator }
