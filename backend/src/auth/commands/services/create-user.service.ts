import { CreateUserDto, UserDto } from '@app/auth/dto/main-user.dto'
import { ProfileEntity, UserEntity } from '@app/auth/entities'
import { AccountEntity } from '@app/auth/entities/accounts.entity'
import { AuthException } from '@app/auth/exceptions'
import { encrypt, passwordGenerator } from '@app/lib/utilities'
import { TYPE_PROVIDER } from '@app/types/enums'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'

@Injectable()
export class CreateUserService {
	private readonly logger = new Logger(CreateUserService.name)

	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

	async createUser(body: CreateUserDto): Promise<UserDto> {
		try {
			//return await this.userRepository.manager
			//.transaction(async (transactionalEntityManager: EntityManager) => {
			// 1. Crear y guardar el perfil
			const profile: ProfileEntity = new ProfileEntity()
			profile.firstName = body.firstName
			profile.lastName = body.lastName
			profile.phone = body.phone
			profile.countryCode = body.countryCode
			profile.countryCallingCode = body.countryCallingCode
			profile.birthDate = body.birthDate
			profile.address = body.address
			profile.image = body.image

			// 2. Crear y guardar la cuenta
			const account = new AccountEntity()
			account.provider = body.provider
			account.token_type = 'JWT' // Esto puede ser una constante, ahora está hardcodeado
			account.role = body.role
			account.type = body.type
			account.permissions = body.permissions
			account.provider = body.password ? TYPE_PROVIDER.CREDENTIALS : TYPE_PROVIDER.LOCAL

			// 3. Crear y guardar el usuario
			const user: UserEntity = new UserEntity()
			user.email = body.email
			user.username = body.username
			user.timeZone = body.timeZone
			const tempPassword: string = body.password ?? passwordGenerator()
			user.password = await encrypt(tempPassword)

			// Asignar las relaciones después de guardar las entidades relacionadas
			user.profile = profile
			user.account = [account]

			// Guardar el usuario en la base de datos
			const result = await this.userRepository.manager.save(user)

			const newUser = plainToClass(UserDto, result)

			return newUser
			//})
		} catch (error) {
			this.logger.error(error)
			throw new AuthException(error.message ?? 'Error creating user', 'CREATE_USER_ERROR_SERVICE')
		}
	}
}
