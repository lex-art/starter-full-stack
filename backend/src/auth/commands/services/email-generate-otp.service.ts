import { EmailVerificationCodeEntity } from '@app/auth/entities'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailGenerateOtpService {
	async generateOtp(email: string): Promise<number> {
		const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit OTP
		const expirationTime = 5 * 60 * 1000 // 5 minutes

		await EmailVerificationCodeEntity.save({
			otp: otp.toString(),
			email,
			expiresAt: new Date(Date.now() + expirationTime),
			generatedAt: new Date()
		})

		return otp
	}
}
