import { USER_TYPE, USER_ROLE, USER_PERMISSION } from '../../types/enums';
import { Type } from 'class-transformer'
import { IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'


export class ProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string

	@IsString()
	@IsNotEmpty()
	firstName: string

	@IsString()
	@IsOptional()
	lastName: string

	@IsDateString()
	@IsNotEmpty()
	birthDate: Date

	@IsString()
	@IsNotEmpty()
	phone: string

	@IsString()
	@IsNotEmpty()
	address: string

	@IsString()
	@IsOptional()
	imgProfile: string
}
