import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators'
import { Injectable } from '@nestjs/common'
import { FindUserService } from './find-user.service'

@Injectable()
export class DeleteAccountService {
	constructor(private readonly findUserService: FindUserService) {}

	async deleteAccount(email: string): Promise<{
		message: string
	}> {
		// TODO: Consider only deactivating the account instead of deleting it
		const user = await this.findUserService.getUser(email)
		const error = Object.entries(userValidator).find(([, validator]) => validator(user))
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}

		user.isActive = false
		user.profile.isActive = false
		user.account = user.account.map((account) => {
			account.isActive = false
			return account
		})

		await user.save()
		return {
			message: 'Account deleted successfully'
		}
	}
}
