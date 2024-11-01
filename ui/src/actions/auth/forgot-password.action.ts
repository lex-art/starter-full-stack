import { API_URLS } from '@/lib/utilities/emun'
import axios from 'axios'

export async function forgotPassword<T>(email: string): Promise<T | { message: string }> {
	try {
		const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + API_URLS.FORGOT_PASSWORD, { email })
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error:', error.response?.data)
			return error.response?.data
		}
		return { message: 'Unknown error' }
	}
}
