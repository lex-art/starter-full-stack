import { IsEmail, IsString } from 'class-validator'

export class VerifyEmailOtpDto {
	@IsString()
	@IsEmail()
	email: string

	@IsString()
	otp: string
}
