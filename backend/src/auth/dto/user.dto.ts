import { USER_TYPE, USER_ROLE, USER_PERMISSION } from './../../types/enums';
import { Type } from 'class-transformer'
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'


export class UserDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	userName: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsEnum(USER_ROLE)
	@IsNotEmpty()
	rol: USER_ROLE

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
