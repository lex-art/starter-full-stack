import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { ProfileEntity, UserEntity } from '../../auth/entities'
import { USER_PERMISSION, USER_ROLE, USER_TYPE } from '../../types/enums'

export class UserSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		const profileRepository = dataSource.getRepository(ProfileEntity)
		const userRepository = dataSource.getRepository(UserEntity)

		const newUser = userRepository.create({
			email: 't642199@gmail.com',
			password: '$2b$10$uLJ0TQGPo0PkTf/CR58QHuqc8r1qxeYelWr2ariMLueqQa.pGACJa', // 12345678
			type: USER_TYPE.STANDARD,
			rol: USER_ROLE.SUPER_ADMIN,
			permissions: [
				USER_PERMISSION.CREATE,
				USER_PERMISSION.READ,
				USER_PERMISSION.UPDATE,
				USER_PERMISSION.DELETE
			]
		})
		const user = await userRepository.save(newUser)
		const profile = profileRepository.create({
			firstName: 'system',
			lastName: 'system',
			phone: '999 999 9999',
			countryCode: 'US',
			countryCallingCode: '1',
			birthDate: new Date(),
			user: user
		})
		await profileRepository.save(profile)
	}
}
