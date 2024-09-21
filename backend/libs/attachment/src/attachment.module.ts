import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AttachmentController } from './controllers/attachment.controller'
import { Services } from './services'

@Module({
	imports: [
		ConfigModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'), // Carpeta donde se almacenan los archivos
			serveRoot: '/uploads' // Ruta en la que serán accesibles los archivos
		})
	],
	controllers: [AttachmentController],
	providers: [...Services],
	exports: [...Services]
})
export class AttachmentModule {}
