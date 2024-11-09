import { RegisterUserDto } from '@app/auth/dto/user.dto'
import { ProfileEntity, UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { encrypt, passwordGenerator } from '@app/lib/utilities'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CreateUserService {
	private readonly logger = new Logger(CreateUserService.name)

	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

	async createUser(body: RegisterUserDto): Promise<{ user: UserEntity; profile: ProfileEntity }> {
		return await this.userRepository.manager
			.transaction(async (transactionalEntityManager) => {
				const user = new UserEntity()
				user.email = body.email
				user.role = body.role
				user.type = body.type
				user.permissions = body.permissions
				user.username = body.username
				user.timeZone = body.timeZone
				const tempPassword: string = passwordGenerator()
				user.password = await encrypt(tempPassword)

				const profile = new ProfileEntity()
				profile.firstName = body.firstName
				profile.lastName = body.lastName
				profile.user = user
				profile.phone = body.phone
				profile.countryCode = body.countryCode
				profile.countryCallingCode = body.countryCallingCode
				profile.birthDate = body.birthDate
				profile.address = body.address
				profile.imgProfile = body.imgProfile
				await transactionalEntityManager.save(user)
				await transactionalEntityManager.save(profile)
				return {
					user,
					profile
				}
			})
			.catch((error) => {
				this.logger.error(error)
				throw new AuthException('ERROR_CREATING_USER', error.message ?? 'Error creating user')
			})
	}
}
