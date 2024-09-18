import { ProfileEntity, UserEntity } from '@app/auth/entities'
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

		const profile = await ProfileEntity.findOne({
			where: {
				user: {
					idUser: user.idUser
				}
			}
		})

		if (!profile) {
			throw new AuthException('Profile not found', 'PROFILE_NOT_FOUND')
		}

		await profile.remove()
		await user.remove()

		return {
			message: 'Account deleted successfully'
		}
	}
}
