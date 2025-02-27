'use server'
import { API_URLS } from '@/lib/emun'
import { GeneralResponse } from '@/types/general-response.type'
import { handleApiError, handleApiResponse } from '@/utils/error-api.util'
import apiConfig from '../apiConfig'

export async function resendOtpAction(email: string): Promise<{
	message: string
	code: string
}> {
	try {
		const response = await apiConfig.post<GeneralResponse>({
			url: API_URLS.RESEND_OTP,
			body: {
				email
			}
		})

		return handleApiResponse(response)
	} catch (error) {
		return handleApiError(error)
	}
}
