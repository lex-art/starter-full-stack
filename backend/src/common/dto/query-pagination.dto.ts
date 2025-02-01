import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class PaginationQueryDto {
	@Type(() => Number)
	@IsInt()
	@IsOptional()
	page: number

	@Type(() => Number)
	@IsInt()
	@IsOptional()
	limit: number

	@IsString()
	@IsOptional()
	orderBy: string

	@IsString()
	@IsOptional()
	orderColumn: 'asc' | 'desc'
}
