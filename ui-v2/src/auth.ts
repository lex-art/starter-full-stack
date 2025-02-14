import axios, { AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { ZodError } from 'zod'
import { refreshAccessToken } from './actions/auth/refreshToken.action'
import { API_URLS } from './lib/emun'
import { AuthSession } from './types/Auth/auth-session'
import { signInSchema } from './zod/schemas/sign-in'

interface DecodedToken {
	exp: number
}

class AuthenticateError extends CredentialsSignin {
	constructor(message: string, code?: string) {
		super()
		this.message = message
		this.code = code ?? 'unexpected_error'
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'username@example.com'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'password'
				}
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = await signInSchema.parseAsync({
						email: credentials?.username,
						password: credentials?.password
					})

					const result: AxiosResponse<{
						message: string
						data: AuthSession
					}> = await axios.post(
						process.env.NEXT_PUBLIC_API_URL + API_URLS.LOGIN,
						{
							email,
							password
						},
						{
							headers: {
								'Content-Type': 'application/json'
							}
						}
					)
					if (result.data) {
						return {
							accessToken: result.data.data.accessToken,
							refreshToken: result.data.data.refreshToken,
							user: result.data.data.user,
							profile: result.data.data.profile,
							auth: result.data.data.auth,
							verified: result.data.data.user.verified
						}
					}
					return null
				} catch (error) {
					if (error instanceof ZodError) {
						console.error('Zod error:', error.errors)
						throw new AuthenticateError(error.errors[0].message)
					}
					if (axios.isAxiosError(error)) {
						console.error('Axios error:', error.response?.data)
						throw new AuthenticateError(
							error.response?.data.message,
							error.response?.data.code
						)
					}
					console.error('Error:', error)
					throw new AuthenticateError('Error inesperado')
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
		verifyRequest: '/auth/verify-request'
	},
	callbacks: {
		jwt: async ({ token, user, account }) => {
			if (user && account?.provider === 'credentials') {
				// if into here, user is first time logged
				const decodedToken: DecodedToken = jwtDecode(
					user.accessToken ?? ''
				)
				return {
					...token,
					name: user.user?.username,
					email: user.user?.email,
					picture: user.profile?.image,
					...user,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					exp: decodedToken.exp
				}
			}
			// Validating the token if it has expired
			const now = Math.floor(Date.now() / 1000)
			const decodedToken: DecodedToken = jwtDecode(token.accessToken ?? '')

			if (decodedToken.exp < now) {
				// token has expired
				const { accessToken, error } = await refreshAccessToken(token)
				if (error) {
					console.error('Error: =>', error)
					return { ...token, accessToken: null, refreshToken: null }
				}
				return {
					...token,
					accessToken
				}
			}
			return token
		},
		session: async ({ session, token }) => {
			// this executes in each request
			/**
			 * If the token is not present, the user is not authenticated
			 */
			if (!token.accessToken && !token.refreshToken) {
				await signOut()
				return {
					...session,
					user: null
				}
			}

			return {
				...session,
				user: token?.user,
				data: {
					id: token?.user?.id,
					name: token?.user?.name,
					email: token?.user?.email,
					accessToken: token?.accessToken,
					refreshToken: token?.refreshToken,
					...token.user
				}
			}
		},
		async signIn({ account, profile }) {
			if (account?.provider === 'google') {
				return !profile?.email?.endsWith('@example.com')
			}
			return true // Do different verification for other providers that don't have `email_verified`
		}
	},
	session: {
		strategy: 'jwt'
	}
})
