import { DataSource } from 'typeorm'
import { Seeder, runSeeder } from 'typeorm-extension'
import { UserSeeder } from './User.seeder'

export class MainSeeder implements Seeder {
	async run(dataSourse: DataSource): Promise<void> {
		await runSeeder(dataSourse, UserSeeder)
		// Add more seeders here
	}
}
