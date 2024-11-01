import { API_URLS } from '@/lib/utilities/emun'
import axios from 'axios'

export async function resetPasswordAction<T>(
	password: string,
	confirmPassword: string,
	token?: string | null
): Promise<T | { message: string; error?: string }> {
	try {
		const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + API_URLS.RESET_PASSWORD, {
			password,
			confirmPassword,
			token
		})
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error:', error.response?.data)
			return error.response?.data
		}
		return { message: 'Unknown error', error: 'Unknown error' }
	}
}
