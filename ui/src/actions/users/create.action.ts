'use server'
import { NewUserSchema } from '@/app/schemas/users/new-user.schema'
import { API_URLS } from '@/lib/utilities/emun'
import axios from 'axios'
import apiConfig, { IResponse } from '../apiConfig'

export async function createUserAction(
	data: NewUserSchema
): Promise<IResponse> {
	try {
		const response = await apiConfig.post<any>({
			url: API_URLS.REGISTER,
			body: data
		})
		return response
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error:', error.response?.data)
			return error.response?.data
		}
		return {
			status: 500,
			error: 'Unknown error',
			data: {}
		}
	}
}
