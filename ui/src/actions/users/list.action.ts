'use server'

import { API_URLS } from '@/lib/utilities/emun'
import { Pagination } from '@/types'
import apiConfig, { IResponse } from '../apiConfig'

export async function listUsersAction({
	page = 1,
	limit = 10,
	orderBy = 'createdAt',
	orderColumn = 'desc'
}: Pagination): Promise<IResponse> {
	return apiConfig.get<any>({
		url:
			API_URLS.USER_LIST +
			`?page=${page}&limit=${limit}&orderBy=${orderBy}&orderColumn=${orderColumn}`
	})
}
