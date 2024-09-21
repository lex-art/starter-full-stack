import { Type } from 'class-transformer'
import { IsDate, IsOptional } from 'class-validator'

export abstract class BaseQueryPagination {
	@Type(() => Date)
	@IsOptional()
	@IsDate()
	until?: Date

	@Type(() => Date)
	@IsOptional()
	@IsDate()
	since?: Date
}
