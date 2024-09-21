import { Injectable } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Injectable()
export class FileUploadService {
	constructor() {}
	getMulterOptions(): MulterOptions {
		return {
			storage: diskStorage({
				destination: './uploads',
				filename: (_, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
					const ext = extname(file.originalname)
					cb(null, `${uniqueSuffix}${ext}`)
				}
			})
		}
	}
}
