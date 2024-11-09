'use server'

import { IFullUser, Pagination } from '@/types'
import apiConfig, { IResponse } from '../apiConfig'

export async function listUsersAction(
	url: string
): Promise<IResponse<Pagination<IFullUser>>> {
	return apiConfig.get<Pagination<IFullUser>>({
		url
	})
}
