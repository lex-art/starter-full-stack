'use server'
import { IProfile, IUser } from '@/types'
import apiConfig, { IResponse } from '../apiConfig'

export async function getUserAction(
	url: string
): Promise<IResponse<IUser & IProfile>> {
	return apiConfig.get<IUser & IProfile>({
		url
	})
}
