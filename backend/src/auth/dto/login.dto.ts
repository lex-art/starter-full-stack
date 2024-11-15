import { IntersectionType, PickType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginFormDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string
}

export class EmailDto extends IntersectionType(PickType(LoginFormDto, ['email'])) {}

export class PasswordDto extends IntersectionType(PickType(LoginFormDto, ['password'])) {}
