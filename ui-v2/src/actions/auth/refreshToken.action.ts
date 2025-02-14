import { API_URLS } from '@/lib/emun'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'

export async function refreshAccessToken(
	token: JWT
): Promise<{ accessToken: string; error?: string }> {
	try {
		const response = await axios.post(
			process.env.NEXT_PUBLIC_API_URL + API_URLS.REFRESH_TOKEN,
			{
				refreshToken: token.refreshToken
			}
		)
		const refreshedTokens = response.data.data

		return {
			accessToken: refreshedTokens.accessToken
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error:', error.response?.data)
		}
		return {
			accessToken: '',
			error: 'RefreshAccessTokenError'
		}
	}
}
