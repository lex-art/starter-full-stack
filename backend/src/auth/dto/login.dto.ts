import { TYPE_PROVIDER } from '@app/types/enums'
import { IntersectionType, PickType } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class LoginFormDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string

	@IsEnum(TYPE_PROVIDER)
	@IsOptional()
	provider?: TYPE_PROVIDER
}

export class EmailDto extends IntersectionType(PickType(LoginFormDto, ['email'])) {}

export class PasswordDto extends IntersectionType(PickType(LoginFormDto, ['password'])) {}
