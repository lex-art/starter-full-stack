import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { AccountEntity, ProfileEntity, UserEntity } from '../../auth/entities'
import { encrypt } from '../../lib/utilities'

export class UserSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		const profileRepository = dataSource.getRepository(ProfileEntity)
		const userRepository = dataSource.getRepository(UserEntity)
		const accountRepository = dataSource.getRepository(AccountEntity)

		const newUser = userRepository.create({
			email: 't642199@gmail.com',
			password: await encrypt('1234567'), //'$2b$10$uLJ0TQGPo0PkTf/CR58QHuqc8r1qxeYelWr2ariMLueqQa.pGACJa', // 12345678
			username: 't642199',
			verified: true,
			timeZone: 'America/Guatemala'
		})
		const user = await userRepository.save(newUser)

		const profile = profileRepository.create({
			firstName: 'system',
			lastName: 'system',
			phone: '+502 9999 9999',
			countryCode: 'GT',
			countryCallingCode: '+502',
			birthDate: new Date()
		})
		await profileRepository.save(profile)

		const account = accountRepository.create({
			user: user,
			profile: profile,
			provider: 'CREDENTIALS'
			//type: 'STANDARD'
		})

		await accountRepository.save(account)
	}
}
