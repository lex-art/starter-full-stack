import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { USER_TYPE } from 'src/types/enums'


export class ChangePasswordDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	newPassword: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	confirmNewPassword: string

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string
}

export class ForgotPAsswordDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsEnum(USER_TYPE)
	@IsNotEmpty()
	type: USER_TYPE
}

export class ResetPasswordDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string

	@IsString()
	@IsNotEmpty()
	token: string
}