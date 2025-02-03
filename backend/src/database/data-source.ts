import { envs } from '@app/config/env/envs'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { MainSeeder } from './seeds/Main.seeder'

const options: DataSourceOptions & SeederOptions = {
	type: 'postgres',
	host: envs.DATABASE_HOST,
	port: +envs.DATABASE_PORT,
	username: envs.DATABASE_USERNAME,
	password: envs.DATABASE_PASSWORD,
	database: envs.DATABASE_NAME,
	schema: envs.DATABASE_SCHEMA,
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
