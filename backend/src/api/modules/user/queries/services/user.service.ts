import { ApiException } from '@app/api/exceptions/api.exception'
import { LoginFormDto } from '@app/auth/dto'
import { UserEntity } from '@app/auth/entities'
import { Paginate } from '@app/decorator'
import { encrypt } from '@app/lib/utilities'
import { GeneralResponse } from '@app/types'
import { PaginateOptions } from '@app/types/pagination'
import { Injectable } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { FindOptionsWhere } from 'typeorm'

@Injectable()
export class UserQueryService {
	async get(data: Pick<LoginFormDto, 'email'>): Promise<Record<string, unknown>> {
		if (!data.email) {
			throw new ApiException('Email is required', 'EMAIL_REQUIRED')
		}
		const user: UserEntity = await UserEntity.findOne({ where: { email: data.email, isActive: true } })
		if (!user) {
			throw new ApiException('User not found', 'USER_NOT_FOUND')
		}

		delete user.password

		return instanceToPlain(user)
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
		paginationOptions: PaginateOptions<UserEntity>
		filtersOptions: FindOptionsWhere<UserEntity>[]
	}): Promise<[UserEntity[], number]> {
		return await UserEntity.findAndCount({
			where: filtersOptions,
			select: {
				createdAt: true,
				updatedAt: true,
				email: true,
				username: true,
				account: {
					provider: true,
					role: true,
					type: true,
					permissions: true
				},
				profile: {
					firstName: true,
					lastName: true,
					phone: true,
					address: true
				}
			},
			relations: {
				profile: true,
				account: true
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
			code: 'USER_UPDATED',
			data: {
				user: user.email
			}
		}
	}
}
