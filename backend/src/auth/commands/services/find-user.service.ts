import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators/user.validator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindUserService {
	async getUser(email?: string, userId?: string): Promise<UserEntity> {
		const user = await UserEntity.findOne({
			...(email && { where: { email } }),
			...(userId && { where: { userId } }),
			relations: {
				account: true,
				profile: true
			}
		})
		const error = Object.entries(userValidator).find(([, validator]) => validator(user))
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}
		return user
	}

	async getRawUser(email?: string, userId?: string): Promise<UserEntity> {
		const user = await UserEntity.findOne({
			...(email && { where: { email } }),
			...(userId && { where: { userId } }),
			relations: {
				account: true,
				profile: true
			}
		})
		if (!user) {
			throw new AuthException('User not found', 'USER_NOT_FOUND')
		}
		return user
	}
}
