import { UserEntity } from '@app/auth/entities'
import { mapPagination } from '@app/lib/utilities'
import { PaginateOptions } from '@app/types/pagination'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Between, FindOperator, FindOptionsWhere, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm'
import { GetAllUserQuery } from '../query/get-all-user.query'
import { UserQueryService } from '../services/user.service'

@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
	constructor(private readonly userQueryService: UserQueryService) {}

	async execute(query: GetAllUserQuery): Promise<Promise<[UserEntity[], number]>> {
		try {
			const filtersQuery = query.body.filtersQuery
			const paginationQuery = query.body.paginationQuery

			const paginationOptions: PaginateOptions<UserEntity> = mapPagination(paginationQuery)

			let createdAt: Date | FindOperator<Date> = undefined
			if (filtersQuery.since && filtersQuery.until) {
				createdAt = Between(filtersQuery.since, filtersQuery.until)
			} else if (filtersQuery.since) {
				createdAt = MoreThanOrEqual(filtersQuery.since)
			} else if (filtersQuery.until) {
				createdAt = LessThanOrEqual(filtersQuery.until)
			}
			const nameCondition =
				filtersQuery.firstName || filtersQuery.lastName
					? [
							{ firstName: Like(`%${filtersQuery.firstName}%`) },
							{ lastName: Like(`%${filtersQuery.lastName}%`) }
						]
					: undefined

			const filtersOptions: FindOptionsWhere<UserEntity>[] = [
				{
					isActive: true,
					account: {
						profile: {
							firstName: query.body?.filtersQuery?.firstName
								? Like(`%${query.body.filtersQuery.firstName}%`)
								: undefined,
							lastName: query.body?.filtersQuery?.lastName
								? Like(`%${query.body.filtersQuery.lastName}%`)
								: undefined,
							phone: query.body?.filtersQuery?.phone
								? Like(`%${query.body.filtersQuery.phone}%`)
								: undefined
						}
					},
					createdAt: createdAt,
					...(nameCondition ? { Or: nameCondition } : {})
				}
			]
			return await this.userQueryService.getAll({
				paginationOptions,
				filtersOptions
			})
		} catch (error) {
			return error
		}
	}
}
