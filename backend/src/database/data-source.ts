import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { MainSeeder } from './seeds/Main.seeder'

config()
const configService = new ConfigService()

const options: DataSourceOptions & SeederOptions = {
	type: 'postgres',
	host: configService.getOrThrow('DATABASE_HOST'),
	port: configService.getOrThrow('DATABASE_PORT'),
	username: configService.getOrThrow('DATABASE_USERNAME'),
	password: configService.getOrThrow('DATABASE_PASSWORD'),
	database: configService.getOrThrow('DATABASE_NAME'),
	schema: configService.getOrThrow('DATABASE_SCHEMA'),
	migrations: ['./src/database/migrations/*{.js,.ts}'],
	entities: ['./src/**/*.entity{.ts,.js}'],
	seeds: [MainSeeder],
	synchronize: false,
	extra: {
		decimalNumbers: true,
		charset: 'utf8mb4_unicode_ci',
		connectionLimit: 5
	}
}

const dataSource: DataSource = new DataSource(options)

export default dataSource
