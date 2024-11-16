import { VerificationTokenEntity } from '@app/auth/entities'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// this Service is not implemented yet
@Injectable()
export class GenerateVerificationService {
	constructor(private readonly jwtService: JwtService) {}
	async generate(email: string): Promise<string> {
		const expirationTime = 24 * 60 * 60 * 1000 // 24 hours
		const token = this.jwtService.sign({ email }, { expiresIn: '24h' })

		const emailVerification = new VerificationTokenEntity()
		emailVerification.identifier = email
		emailVerification.token = token
		emailVerification.expires = new Date(Date.now() + expirationTime)
		await emailVerification.save()

		return token
	}
}
