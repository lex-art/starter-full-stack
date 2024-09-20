import { IsNotEmpty, IsString } from 'class-validator'

export class PreUploadUrlDto {
	@IsString()
	@IsNotEmpty()
	readonly typeFile: string

	@IsString()
	@IsNotEmpty()
	readonly extension: string

	@IsString()
	@IsNotEmpty()
	readonly bucketFolder: string
}
