import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class PaginationQueryDto {
	@Type(() => Number)
	@IsInt()
	@IsNotEmpty()
	page: number

	@Type(() => Number)
	@IsInt()
	@IsNotEmpty()
	limit: number

	@IsString()
	@IsNotEmpty()
	orderBy: string

	@IsString()
	@IsNotEmpty()
	orderColumn: 'asc' | 'desc'
}
