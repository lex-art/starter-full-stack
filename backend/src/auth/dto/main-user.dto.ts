import { USER_PERMISSION, USER_ROLE, USER_TYPE } from '@app/types/enums'
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'
import { Exclude, Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	ValidateNested
} from 'class-validator'
import { TYPE_PROVIDER } from '../../types/enums/type-provider.enum'

// This is the DTO (Data Transfer Object) for creating a user when for example a new user when the web app is public and note need to be authenticated by an admin
class CreateUserDto {
	@IsEmail()
	email!: string

	@Exclude() // when use plainToClass, this field will be excluded
	@IsString()
	@MaxLength(72) // bcrypt max length is 72, if you change this, you need to change the bcrypt hash because it will fail
	password!: string

	@IsEnum(USER_ROLE)
	@IsNotEmpty()
	role: USER_ROLE

	@IsEnum(USER_TYPE)
	@IsNotEmpty()
	type: USER_TYPE

	@IsArray()
	@IsOptional()
	@Type(() => String)
	permissions?: USER_PERMISSION[]

	@IsOptional()
	@IsString()
	timeZone?: string

	@IsString()
	@MaxLength(100)
	username!: string

	// for account
	@IsString()
	@IsOptional()
	@IsEnum(TYPE_PROVIDER)
	provider?: TYPE_PROVIDER // for example: 'google', 'facebook', 'email', 'email provider'. 'local'

	// for profile
	@IsString()
	@MaxLength(100)
	firstName!: string

	@IsString()
	@MaxLength(100)
	lastName!: string

	@IsString()
	@MaxLength(25)
	phone!: string

	@IsString()
	@MaxLength(5)
	countryCode!: string

	@IsString()
	@MaxLength(5)
	countryCallingCode!: string

	@IsString()
	@MaxLength(255)
	address!: string

	@Type(() => Date)
	@IsDate()
	birthDate!: Date

	@IsString()
	@IsOptional()
	image?: string
}

class UpdateUserDto extends PartialType(CreateUserDto) {}

class ProfileDto extends IntersectionType(
	PickType(CreateUserDto, [
		'firstName',
		'lastName',
		'phone',
		'countryCode',
		'countryCallingCode',
		'address',
		'birthDate',
		'image'
	])
) {
	@IsString()
	profileId!: string
}

class AccountDto extends IntersectionType(
	PickType(CreateUserDto, ['provider', 'role', 'type', 'permissions'])
) {
	@IsString()
	accountId!: string

	@ValidateNested()
	profile!: ProfileDto
}

class UserDto extends IntersectionType(
	PickType(CreateUserDto, ['email', 'password', 'timeZone', 'username'])
) {
	@IsString()
	userId!: string

	@IsBoolean()
	verified!: boolean

	// if you want to use a multi-account system, you can use an array of accounts
	@ValidateNested()
	account!: AccountDto
}

class CurrentUserDto extends IntersectionType(
	PickType(UserDto, ['userId', /*  'email', */ 'verified']),
	PickType(AccountDto, ['accountId' /* 'role', 'type', 'permissions' */]),
	PickType(ProfileDto, ['profileId'])
) {}

export { AccountDto, CreateUserDto, CurrentUserDto, ProfileDto, UpdateUserDto, UserDto }
