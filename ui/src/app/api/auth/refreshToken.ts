import { JWT } from 'next-auth/jwt'

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshGoogleAccessToken(token: JWT) {
	try {
		const params = new URLSearchParams({
			client_id: process.env.GOOGLE_CLIENT_ID ?? '',
			client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			grant_type: 'refresh_token',
			refresh_token: token.refreshToken as string
		})

		// TODO: Use the correct URL
		const url = `https://oauth2.googleapis.com/token?${params.toString()}`

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		})

		const refreshedTokens = await response.json()

		if (!response.ok) {
			throw refreshedTokens
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
		}
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError'
		}
	}
}
