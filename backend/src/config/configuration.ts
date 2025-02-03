import { MailerOptions } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { JwtModuleOptions } from '@nestjs/jwt'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { envs } from './env/envs'

export interface IConfig {
	db: TypeOrmModuleOptions
	jwt: JwtModuleOptions & {
		secretRefresh: string
		expiresRefreshIn: string
	}
	mail: MailerOptions
	crypto: {
		algorithm: string
		key: string
		iv: string
	}
	flags: {
		methodVerify: string
	}
}
const configuration: IConfig = {
	db: {
		type: 'postgres',
		logging: true,
		host: envs.DATABASE_HOST,
		port: parseInt(envs.DATABASE_PORT),
		username: envs.DATABASE_USERNAME,
		password: envs.DATABASE_PASSWORD,
		database: envs.DATABASE_NAME,
		schema: envs.DATABASE_SCHEMA,
		autoLoadEntities: true,
		synchronize: envs.NODE_ENV === 'development',
		entities: [__dirname + '/**/*.entity{.ts,.js}'],
		migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
		extra: {
			decimalNumbers: true,
			charset: 'utf8mb4_unicode_ci',
			connectionLimit: 2,
			timezone: 'Z'
		}
	},
	jwt: {
		global: true,
		secret: envs.JWT_SECRET,
		signOptions: {
			expiresIn: envs.JWT_EXPIRATION_IN
		},
		secretRefresh: envs.JWT_REFRESH_SECRET,
		expiresRefreshIn: envs.JWT_REFRESH_EXPIRATION_IN
	},
	mail: {
		transport: {
			host: envs.EMAIL_HOST,
			secure: envs.EMAIL_SECURE === 'true',
			port: parseInt(envs.EMAIL_PORT),
			auth: {
				user: envs.EMAIL_USER,
				pass: envs.EMAIL_PASSWORD
			}
		},
		defaults: {
			from: '"No Reply" <noreply@app>'
		},
		template: {
			dir: join(__dirname, 'libs/mail/src/templates/'),
			adapter: new HandlebarsAdapter(),
			options: {
				strict: true
			}
		}
	},
	crypto: {
		algorithm: envs.CRYPT_ALGORITHM,
		key: envs.CRYPT_KEY,
		iv: envs.CRYPT_KEY_16
	},
	flags: {
		methodVerify: envs.FLAG_METHOD_VERIFY
	}
}

export { configuration }
