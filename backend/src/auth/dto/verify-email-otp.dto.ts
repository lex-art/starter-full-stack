import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class VerifyEmailOtpDto {
	@IsString()
	@IsEmail()
	email: string

	@IsString()
	otp: string
}

export class TokenDto {
	@IsString()
	@IsNotEmpty()
	token!: string
}
