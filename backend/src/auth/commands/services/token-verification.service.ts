import { VerificationTokenEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { tokenValidator } from '@app/auth/lib/validators'
import { TYPE_VERIFICATION_TOKEN } from '@app/types/enums'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// this Service is not implemented yet
@Injectable()
export class TokenVerificationService {
	constructor(private readonly jwtService: JwtService) {}

	async generateVerificationEmail(email: string): Promise<string> {
		const expirationTime = 24 * 60 * 60 * 1000 // 24 hours
		const token = this.jwtService.sign({ email }, { expiresIn: '24h' })

		const emailVerification = new VerificationTokenEntity()
		emailVerification.identifier = email
		emailVerification.token = token
		emailVerification.type = TYPE_VERIFICATION_TOKEN.EMAIL
		emailVerification.expires = new Date(Date.now() + expirationTime)
		await emailVerification.save()

		return token
	}

	async generateVerificationResetPassword(email: string): Promise<string> {
		const expirationTime = 24 * 60 * 60 * 1000 // 24 hours
		const token = this.jwtService.sign({ email }, { expiresIn: '24h' })

		const resetPasswordVerification = new VerificationTokenEntity()
		resetPasswordVerification.identifier = email
		resetPasswordVerification.token = token
		resetPasswordVerification.type = TYPE_VERIFICATION_TOKEN.RESET_PASSWORD
		resetPasswordVerification.expires = new Date(Date.now() + expirationTime)
		await resetPasswordVerification.save()

		return token
	}

	async verificationEmail(email: string, token: string): Promise<boolean> {
		const tokenValidation = await VerificationTokenEntity.findOne({
			where: {
				identifier: email,
				type: TYPE_VERIFICATION_TOKEN.EMAIL
			}
		})

		const error = Object.entries(tokenValidator).find(([, validator]) =>
			validator(tokenValidation, token)
		)
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}
		tokenValidation.isUsed = true
		await tokenValidation.save()
		return true
	}

	async verificationResetPassword(email: string, token: string): Promise<boolean> {
		const tokenValidation = await VerificationTokenEntity.findOne({
			where: {
				identifier: email,
				type: TYPE_VERIFICATION_TOKEN.RESET_PASSWORD
			}
		})

		const error = Object.entries(tokenValidator).find(([, validator]) =>
			validator(tokenValidation, token)
		)
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}
		tokenValidation.isUsed = true
		await tokenValidation.save()
		return true
	}
}
