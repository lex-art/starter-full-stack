import { IntersectionType, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { USER_PERMISSION, USER_ROLE, USER_TYPE } from './../../types/enums'
import { ProfileDto } from './profile.dto'

export class UserDto {
	@Type(() => Number)
	@IsNumber()
	idUser: number

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	username: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsEnum(USER_ROLE)
	@IsNotEmpty()
	role: USER_ROLE

	@IsEnum(USER_TYPE)
	@IsNotEmpty()
	type: USER_TYPE

	@IsArray()
	@IsOptional()
	@Type(() => String)
	permissions: USER_PERMISSION[]

	@IsOptional()
	@IsString()
	timeZone: string
}

export class RegisterUserDto extends IntersectionType(
	OmitType(UserDto, ['idUser', 'password']),
	OmitType(ProfileDto, ['idProfile'])
) {}
