import { API_URLS } from '@/lib/emun'
import axios from 'axios'
import apiConfig from '../apiConfig'

export async function resendOtpAction(email: string): Promise<{
	message: string
	code: string
}> {
	try {
		const response = await apiConfig.post<any>({
			url: API_URLS.RESEND_VERIFICATION,
			body: {
				email
			}
		})
		return response
	} catch (error) {
		console.error('Error ==>:', error)
		if (axios.isAxiosError(error)) {
			console.error('Error:', error.response?.data)
			return error.response?.data
		}
		return {
			message: 'Unknown error',
			code: 'OTP_NOT_SEND'
		}
	}
}
