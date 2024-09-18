import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class ResetPasswordDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	confirmPassword: string

	@IsString()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	token?: string
}
