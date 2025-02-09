import { AccountDto, CreateUserDto, ProfileDto, UserDto } from '@app/auth/dto/main-user.dto'
import { ProfileEntity, UserEntity } from '@app/auth/entities'
import { AccountEntity } from '@app/auth/entities/accounts.entity'
import { AuthException } from '@app/auth/exceptions'
import { encrypt, passwordGenerator } from '@app/lib/utilities'
import { TYPE_PROVIDER } from '@app/types/enums'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { EntityManager, Repository } from 'typeorm'

@Injectable()
export class CreateUserService {
	private readonly logger = new Logger(CreateUserService.name)

	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

	async createUser(body: CreateUserDto): Promise<UserDto> {
		return await this.userRepository.manager
			.transaction(async (transactionalEntityManager: EntityManager) => {
				const profile: ProfileEntity = new ProfileEntity()
				profile.firstName = body.firstName
				profile.lastName = body.lastName
				profile.phone = body.phone
				profile.countryCode = body.countryCode
				profile.countryCallingCode = body.countryCallingCode
				profile.birthDate = body.birthDate
				profile.address = body.address
				profile.image = body.image

				await transactionalEntityManager.save(profile)

				const account = new AccountEntity()
				account.provider = body.provider
				account.token_type = 'JWT' // this can be a constant, now is hardcode
				account.role = body.role
				account.type = body.type
				account.permissions = body.permissions
				account.provider = body.password ? TYPE_PROVIDER.CREDENTIALS : TYPE_PROVIDER.LOCAL

				await transactionalEntityManager.save(account)

				const user: UserEntity = new UserEntity()
				user.email = body.email
				user.username = body.username
				user.timeZone = body.timeZone
				const tempPassword: string = body.password ?? passwordGenerator()
				user.password = await encrypt(tempPassword)

				//relations
				user.account = [account]
				user.profile = profile

				await transactionalEntityManager.save(user)

				const newUser = plainToClass(UserDto, user)
				newUser.account = plainToClass(AccountDto, account)
				newUser.account.profile = plainToClass(ProfileDto, profile)

				return newUser
			})
			.catch((error) => {
				this.logger.error(error)
				throw new AuthException(error.message ?? 'Error creating user', 'CREATE_USER_ERROR_SERVICE')
			})
	}
}
