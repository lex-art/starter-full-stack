import { ApiException } from '@app/api/exceptions/api.exception'
import { LoginFormDto } from '@app/auth/dto'
import { ProfileEntity, UserEntity } from '@app/auth/entities'
import { Paginate } from '@app/decorator'
import { encrypt } from '@app/lib/utilities'
import { GeneralResponse } from '@app/types'
import { PaginateOptions } from '@app/types/pagination'
import { Injectable } from '@nestjs/common'
import { FindOptionsWhere } from 'typeorm'

@Injectable()
export class UserQueryService {
	async get(data: Pick<LoginFormDto, 'email'>): Promise<GeneralResponse> {
		const user: UserEntity = await UserEntity.findOne({ where: { email: data.email } })
		if (!user) {
			throw new ApiException('User not found', 'USER_NOT_FOUND')
		}
		const profile: ProfileEntity = await ProfileEntity.findOne({
			where: {
				user: {
					idUser: user.idUser
				}
			}
		})

		delete user.password

		return {
			message: 'User updated successfully',
			data: {
				...user,
				...profile
			}
		}
	}

	@Paginate({
		limit: 10,
		page: 1,
		orderBy: 'createdAt',
		orderColumn: 'desc'
	})
	async getAll({
		paginationOptions,
		filtersOptions
	}: {
		paginationOptions: PaginateOptions<ProfileEntity>
		filtersOptions: FindOptionsWhere<ProfileEntity>[]
	}): Promise<[ProfileEntity[], number]> {
		return await ProfileEntity.findAndCount({
			where: filtersOptions,
			select: {
				idProfile: true,
				firstName: true,
				lastName: true,
				phone: true,
				address: true,
				createdAt: true,
				updatedAt: true,
				user: {
					idUser: true,
					email: true,
					password: true,
					permissions: true,
					type: true,
					timeZone: true,
					rol: true,
					createdAt: true,
					updatedAt: true
				}
			},
			relations: {
				user: true
			},
			...paginationOptions
		}).catch((error) => {
			throw new ApiException(error.message ?? 'error get all users', 'ERROR_GET_ALL_USER')
		})
	}

	async changePassword(data: LoginFormDto): Promise<GeneralResponse> {
		const user: UserEntity = await UserEntity.findOne({ where: { email: data.email } })
		user.password = await encrypt(data.password)
		await user.save()
		return {
			message: 'User updated',
			data: {
				user: user.email
			}
		}
	}
}
