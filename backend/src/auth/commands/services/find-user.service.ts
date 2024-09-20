import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindUserService {
	async getUser(email: string) {
		const user = await UserEntity.findOne({ where: { email } })
		if (!user) {
			throw new AuthException('User not found', 'USER_NOT_FOUND')
		}
		return user
	}
}
