import { DataSource } from 'typeorm'
import { Seeder, runSeeder } from 'typeorm-extension'
import { UserSeeder } from './User.seeder'

export class MainSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		await runSeeder(dataSource, UserSeeder)
		// Add more seeders here
	}
}
