import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ProfileDto {
	@IsString()
	@IsNotEmpty()
	idProfile: string

	@IsString()
	@IsNotEmpty()
	firstName: string

	@IsString()
	@IsOptional()
	lastName: string

	@Type(() => Date)
	@IsDate()
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

	@IsString()
	@IsOptional()
	countryCode: string

	@IsString()
	@IsOptional()
	countryCallingCode: string
}
