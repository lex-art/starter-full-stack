import { GeneralResponse } from '@/types/general-response.type'
import axios from 'axios'

const handleApiResponse = (response: GeneralResponse) => {
	if ('error' in response) {
		const error =
			typeof response.error === 'string'
				? { message: response.error, code: response.code }
				: (response.error as {
						message: string
						code: string
					})
		return {
			message: error?.message ?? 'Unknown error',
			code: error?.code
		}
	}
	return response
}

const handleApiError = (error: any) => {
	console.error('Error ==>:', error)
	if (axios.isAxiosError(error)) {
		console.error('Error:', error.response?.data)
		return error.response?.data
	}
	return {
		message: error?.message ?? 'Unknown error',
		code: error?.code ?? 'USER_VERIFY_ERROR'
	}
}

export { handleApiError, handleApiResponse }
