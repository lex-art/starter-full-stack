import axios, { AxiosResponse } from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { ZodError } from 'zod'
import { API_URLS } from './lib/emun'
import { AuthSession } from './types/Auth/auth-session'
import { signInSchema } from './zod/schemas/sign-in'

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
						throw new Error(error.errors[0].message)
					}
					if (axios.isAxiosError(error)) {
						console.error('Axios error:', error.response?.data)
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
		verifyRequest: '/auth/verify-request'
	}
})
