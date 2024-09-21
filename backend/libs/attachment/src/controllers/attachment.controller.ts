import { FileUploadService } from '@app/attachment/services/file-upload.service'
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { join } from 'path'

@Controller('upload')
export class AttachmentController {
	@Post()
	@UseInterceptors(FileInterceptor('file', new FileUploadService().getMulterOptions()))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return {
			message: 'Archivo subido exitosamente',
			filename: file.filename
		}
	}

	@Post('multiple')
	@UseInterceptors(FileInterceptor('files', new FileUploadService().getMulterOptions()))
	uploadMultipleFiles(@UploadedFile() files: Express.Multer.File[]) {
		return {
			message: 'Archivos subidos exitosamente',
			filenames: files.map((file) => file.filename)
		}
	}

	// Método para descargar el archivo
	@Get('download/:filename')
	downloadFile(@Param('filename') filename: string, @Res() res: Response) {
		const filePath = join(__dirname, '..', '..', '..', '..', 'uploads', filename)
		return res.download(filePath) // Esto fuerza la descarga del archivo
	}

	// Método para ver el archivo (si es compatible con el navegador)
	@Get(':filename')
	viewFile(@Param('filename') filename: string, @Res() res: Response) {
		const filePath = join(__dirname, '..', '..', '..', '..', 'uploads', filename)
		return res.sendFile(filePath) // Esto permite ver el archivo si el navegador lo soporta
	}
}
