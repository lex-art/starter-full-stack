import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadFileService {
	async uploadFile(file: any) {
		return file
	}
}
