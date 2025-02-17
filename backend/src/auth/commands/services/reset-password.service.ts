import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators'
import { GeneralResponse } from '@app/types'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, encrypt } from './../../../lib/utilities'
import { FindUserService } from './find-user.service'
import { TokenVerificationService } from './token-verification.service'

@Injectable()
export class ResetPasswordService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly tokenVerificationService: TokenVerificationService,
		private readonly findUSer: FindUserService
	) {}

	async resetPassword({
		password,
		confirmPassword,
		token
	}: {
		password: string
		confirmPassword: string
		email?: string
		token?: string
	}): Promise<GeneralResponse> {
		const { email }: UserEntity = this.jwtService.verify(token)
		if (!email) {
			throw new AuthException('Invalid token', 'INVALID_TOKEN')
		}

		const user = await this.findUSer.getUser(email)

		const error = Object.entries(userValidator).find(([, validator]) => validator(user))
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}

		if (password !== confirmPassword) {
			throw new AuthException('Password and confirm password do not match', 'PASSWORD_MISMATCH')
		}

		const comparePassword = await compare(password, user.password)
		if (comparePassword) {
			throw new AuthException(
				'New password must be different from the old password',
				'SAME_PASSWORD_ERROR'
			)
		}

		await this.tokenVerificationService.verificationResetPassword(email, token)
		user.password = await encrypt(password)
		await user.save()

		return {
			message: 'Password reset successfully',
			code: 'PASSWORD_RESET_SUCCESS',
			email: user.email
		}
	}
}
