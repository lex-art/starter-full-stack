import { IsNotEmpty, IsString } from 'class-validator'

export class PreSignedUrlDto {
	@IsString()
	@IsNotEmpty()
	readonly fileName: string

	@IsString()
	@IsNotEmpty()
	readonly bucketFolder: string
}
