import axios, { AxiosResponse } from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { API_URLS } from './lib/emun'

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
					const result: AxiosResponse<{
						message: string
						data: {
							accessToken: string
							refreshToken: string
							user: any // IUser
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
							role: result.data.data.user.role,
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
		verifyRequest: '/auth/verify-request'
	}
})
