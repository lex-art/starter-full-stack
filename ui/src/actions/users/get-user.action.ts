'use server'
import { NewUserSchema } from '@/app/schemas/users/new-user.schema'
import apiConfig, { IResponse } from '../apiConfig'

export async function getUserAction(
	url: string
): Promise<IResponse<NewUserSchema>> {
	return apiConfig.get<NewUserSchema>({
		url
	})
}
