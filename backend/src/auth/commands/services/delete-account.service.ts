import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteAccountService {
	async deleteAccount(email: string): Promise<{
		message: string
	}> {
		// TODO: Consider only deactivating the account instead of deleting it
		const user = await UserEntity.findOne({ where: { email } })
		if (!user) {
			throw new AuthException('User not found', 'USER_NOT_FOUND')
		}

		await user.remove()

		return {
			message: 'Account deleted successfully'
		}
	}
}
