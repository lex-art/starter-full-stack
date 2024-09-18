import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { encrypt } from '@app/lib/utilities'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ResetPasswordService {
	constructor(private readonly jwtService: JwtService) {}

	async resetPassword({
		password,
		confirmPassword,
		email,
		token
	}: {
		password: string
		confirmPassword: string
		email?: string
		token?: string
	}): Promise<{
		message: string
		data: {
			email: string
		}
	}> {
		let user: UserEntity = null
		if (token) {
			const dataUser: UserEntity = this.jwtService.verify(token)
			if (!dataUser) {
				throw new AuthException('Invalid token', 'INVALID_TOKEN')
			}
			user = await UserEntity.findOne({ where: { email: dataUser.email } })
		}
		if (email) {
			user = await UserEntity.findOne({ where: { email } })
		}

		if (!user) {
			throw new AuthException('User not found', 'USER_NOT_FOUND')
		}

		if (password !== confirmPassword) {
			throw new AuthException('Password and confirm password do not match', 'PASSWORD_MISMATCH')
		}

		user.password = await encrypt(password)
		await user.save()

		return {
			message: 'Password reset successfully',
			data: {
				email: user.email
			}
		}
	}
}
