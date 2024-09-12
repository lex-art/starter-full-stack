import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
			  return {
				isGlobal: true,
				type: 'postgres',
				logging: true,
				host: configService.get('DATABASE_HOST'),
				port: configService.get('DATABASE_PORT'),
				username: configService.get('DATABASE_USERNAME'),
				password: configService.get('DATABASE_PASSWORD'),
				database: configService.get('DATABASE_NAME'),
				autoLoadEntities: true,
				synchronize: configService.get('NODE_ENV') === 'development',
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
				timezone: 'Z',
				extra: {
				  decimalNumbers: true,
				  charset: 'utf8mb4_unicode_ci',
				  connectionLimit: 2
				},
				schema: 'development'
			  };
			}
		})
	],
	exports: [TypeOrmModule]
})
export class DatabaseModule {}
