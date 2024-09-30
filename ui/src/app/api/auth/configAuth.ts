import { refreshAccessToken } from '@/actions/auth/refreshToken'
import { API_URLS } from '@/lib/utilities/emun'
import { IUser } from '@/types'
import axios, { AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
interface DecodedToken {
	exp: number
}

const configAuth = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { type: 'text', placeholder: 'Email', label: 'Email' },
				password: { type: 'password', placeholder: 'Password', label: 'Password' }
			},
			authorize: async (
				credentials
			): Promise<
				| (User & {
						accessToken: string
						refreshToken: string
				  })
				| null
			> => {
				try {
					const result: AxiosResponse<{
						message: string
						data: {
							accessToken: string
							refreshToken: string
							user: IUser
						}
					}> = await axios.post(
						process.env.NEXT_PUBLIC_API_URL + API_URLS.LOGIN,
						{
							email: credentials?.username,
							password: credentials?.password
						},
						{
							headers: {
								'Content-Type': 'application/json'
							}
						}
					)
					if (result.data) {
						return {
							id: result.data.data.user.idUser.toString(),
							name: result.data.data.user.profile.firstName,
							email: result.data.data.user.email,
							accessToken: result.data.data.accessToken,
							refreshToken: result.data.data.refreshToken,
							rol: result.data.data.user.rol,
							type: result.data.data.user.type,
							permissions: result.data.data.user.permissions,
							timeZone: result.data.data.user.timeZone,
							idUser: result.data.data.user.idUser,
							profile: result.data.data.user.profile
						}
					}
					return null
				} catch (error) {
					if (axios.isAxiosError(error)) {
						console.error('Error:', error.response?.data)
						throw new Error(JSON.stringify(error.response?.data))
					}
					console.error('Error:', error)
					throw new Error('Error inesperado')
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
		})
	],
	pages: {
		signIn: '/auth/login',
		signOut: '/auth/login',
		error: '/auth/login',
		verifyRequest: '/auth/verify-request',
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				const { accessToken, refreshToken, ...rest } = user
				token.user = rest
				token.accessToken = accessToken
				token.refreshToken = refreshToken
				const decodedToken: DecodedToken = jwtDecode(user?.accessToken ?? '')
				const currentTime = Math.floor(Date.now() / 1000)
				token.isSessionExpired = currentTime > decodedToken.exp
			}
			if ((token as { isSessionExpired: number }).isSessionExpired) {
				const refresh = await refreshAccessToken(token)
				if (refresh?.error || !refresh.accessToken) {
					token.accessToken = ''
					token.refreshToken = ''
					token.user = null
					token.isSessionExpired = true
					return token
				}
				token.isSessionExpired = false
				return token
			}
			return token
		},
		session({ session, token }) {
			session.user = token.user as User | null
			session.accessToken = token.accessToken as string
			session.refreshToken = token.refreshToken as string
			if (token.isSessionExpired) {
				session.expires = null
				session.accessToken = null
				session.refreshToken = null
				session.user = null
				return session
			}
			return session
		},
		async signIn({ account, profile, email }) {
			if (account?.provider === 'google') {
				return !profile?.email?.endsWith('@example.com')
			}
			return true // Do different verification for other providers that don't have `email_verified`
		}
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthOptions

export default configAuth
