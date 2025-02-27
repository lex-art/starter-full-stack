'use server'
import { API_URLS } from '@/lib/emun'
import { GeneralResponse } from '@/types/general-response.type'
import { handleApiError, handleApiResponse } from '@/utils/error-api.util'
import apiConfig from '../apiConfig'

export async function verifyUserAction(
	email: string,
	otp: string
): Promise<GeneralResponse> {
	try {
		const response = await apiConfig.post<GeneralResponse>({
			url: API_URLS.VERIFY_USER,
			body: {
				email,
				otp
			}
		})
		return handleApiResponse(response)
	} catch (error) {
		return handleApiError(error)
	}
}
