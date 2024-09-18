import { EmailVerificationCodeEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailVerifyOtpService {
	async verifyOtp(email: string, otp: string): Promise<boolean> {
		const emailVerificationCode = await EmailVerificationCodeEntity.findOne({
			where: {
				email
			}
		})

		if (!emailVerificationCode) {
			throw new AuthException('OTP not found', 'OTP_NOT_FOUND')
		}

		if (emailVerificationCode.otp !== otp) {
			throw new AuthException('Invalid OTP', 'INVALID_OTP')
		}

		if (emailVerificationCode.expiresAt < new Date()) {
			throw new AuthException('OTP expired', 'OTP_EXPIRED')
		}

		if (emailVerificationCode.isUsed) {
			throw new AuthException('OTP already used', 'OTP_USED')
		}

		emailVerificationCode.isUsed = true
		await emailVerificationCode.save()

		return true
	}
}
