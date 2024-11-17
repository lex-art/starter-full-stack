import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators/user.validator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindUserService {
	async getUser(email: string) {
		const user = await UserEntity.findOne({
			where: { email },
			relations: {
				account: {
					profile: true
				}
			}
		})
		const error = Object.entries(userValidator).find(([, validator]) => validator(user))
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}
		return user
	}
}
