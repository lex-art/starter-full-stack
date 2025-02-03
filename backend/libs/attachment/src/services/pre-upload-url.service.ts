import { PreUploadUrlDto } from '@app/attachment/dto/pre-upload-url.dto'
import { envs } from '@app/config/env/envs'
import { GeneralResponse } from '@app/types'
import { PutObjectCommand, PutObjectCommandInput, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'

@Injectable()
export class PreUploadUrlService {
	private s3Client: S3
	constructor() {}
	async generatePreUploadUrl({
		extension,
		typeFile,
		bucketFolder
	}: PreUploadUrlDto): Promise<GeneralResponse> {
		const rawBytes = randomBytes(16)
		const fileName = `${bucketFolder}/${rawBytes.toString('hex')}.${extension}`
		const bucketParams: PutObjectCommandInput = {
			Bucket: envs.AWS_BUCKET_NAME,
			Key: fileName,
			ContentType: typeFile
		}
		try {
			const url = await getSignedUrl(this.s3Client, new PutObjectCommand(bucketParams), {
				expiresIn: 3 * 60 // adjust the expiration time
			})
			return {
				message: 'Pre-upload url generated successfully',
				data: {
					url
				}
			}
		} catch (error) {
			return error
		}
	}
}
