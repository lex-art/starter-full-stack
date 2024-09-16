import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { json, urlencoded } from 'express'
import { writeFileSync } from 'fs'
import helmet from 'helmet'
import { AppModule } from './app.module'

declare const module: any
async function bootstrap() {
	const logger: Logger = new Logger('bootstrap')
	try {
		const app = await NestFactory.create(AppModule)
		app.use(
			helmet({
				contentSecurityPolicy: {
					directives: {
						scriptSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
						styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
						imgSrc: ["'self'", 'data:']
					}
				},
				frameguard: { action: 'deny' }, // Evitar la inserción en marcos (Clickjacking)
				hidePoweredBy: true, // Ocultar la información de la tecnología utilizada
				xssFilter: true, // Filtro XSS (Cross-Site Scripting)
				noSniff: true
			})
		)

		// this is not necessary because we are using the enableCors method
		/* app.use((_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // Configuración de los dominios que pueden acceder a la API
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE, PATCH',
      ); // Configuración de los métodos HTTP que pueden acceder a la API
      res.header('Accept', 'application/json');
      next();
    }); */

		app.enableCors({
			origin: '*',
			methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
			allowedHeaders: 'Content-Type, Authorization'
		})
		app.use(json({ limit: '15mb' }))
		app.use(urlencoded({ extended: true, limit: '15mb' }))

		// config swagger
		const config = new DocumentBuilder()
			.setTitle('API')
			.setDescription('API description')
			.setVersion('1.0')
			.addTag('API')
			.build()
		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('api', app, document)

		writeFileSync('./docs/swagger-spec.json', JSON.stringify(document, null, 2))
		app.setGlobalPrefix('api')
		await app.listen(3002)
		if (module.hot) {
			module.hot.accept()
			module.hot.dispose(() => app.close())
		}
	} catch (error: any) {
		logger.error(error)
	}
}
bootstrap()
