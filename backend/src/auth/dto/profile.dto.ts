import {  IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'


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

	@IsString()
	@IsOptional()
	countryCode: string

	@IsString()
	@IsOptional()
	countryCallingCode: string
}
