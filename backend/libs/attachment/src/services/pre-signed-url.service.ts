import { PreSignedUrlDto } from '@app/attachment/dto/pre-signed-url.dto'
import { envs } from '@app/config/env/envs'
import { GeneralResponse } from '@app/types'
import { GetObjectCommand, PutObjectCommandInput, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PreSignedUrlService {
	private s3Client: S3
	constructor() {}
	async generatePreSignedUrl({ fileName, bucketFolder }: PreSignedUrlDto): Promise<GeneralResponse> {
		const bucketParams: PutObjectCommandInput = {
			Bucket: envs.AWS_BUCKET_NAME,
			Key: `${bucketFolder}/${fileName}`,
			ACL: 'public-read'
		}
		try {
			const url = await getSignedUrl(this.s3Client, new GetObjectCommand(bucketParams), {
				expiresIn: 15 * 60 // adjust the expiration time
			})
			return {
				message: 'Pre-signed url generated successfully',
				code: 'URL_SIGNED_GENERATED',
				data: {
					url
				}
			}
		} catch (error) {
			return error
		}
	}
}
