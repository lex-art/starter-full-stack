import { API_URLS } from '@/lib/utilities/emun'
import apiConfig from '../apiConfig'

export const refreshAccessTokenAction = async (refreshToken?: string) => {
	const response = await apiConfig.post<{
		token: string
	}>({
		url: API_URLS.REFRESH_TOKEN,
		body: { refreshToken }
	})
	if (response.error) {
		return {
			token: null
		}
	}
	return {
		token: response?.data.token
	}
}
