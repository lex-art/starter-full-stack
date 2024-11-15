import { VerificationTokenEntity } from '@app/auth/entities'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailGenerateOtpService {
	async generateOtp(email: string): Promise<number> {
		const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit OTP
		const expirationTime = 5 * 60 * 1000 // 5 minutes

		const emailVerificationCode = new VerificationTokenEntity()
		emailVerificationCode.identifier = email
		emailVerificationCode.otp = otp.toString()
		emailVerificationCode.expires = new Date(Date.now() + expirationTime)
		await emailVerificationCode.save()

		return otp
	}
}
