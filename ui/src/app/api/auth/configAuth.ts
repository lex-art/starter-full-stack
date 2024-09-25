import { API_URLS } from '@/lib/utilities/emun'
import { IUser } from '@/types'
import axios, { AxiosResponse } from 'axios'
import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

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
					console.log('====================================')
					console.log(credentials)
					console.log('====================================')
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
						console.log('====================================')
						console.log(result.data)
						console.log('====================================')
						return {
							id: result.data.data.user.idUser.toString(),
							name: result.data.data.user.profile.firstName,
							email: result.data.data.user.email,
							image: result.data.data.user.profile.imgProfile,
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
					if (axios.isAxiosError(result)) {
						console.error('Error:', result.response?.data)
						return null
					}
					return null
				} catch (error) {
					if (axios.isAxiosError(error)) {
						console.error('Error:', error.response?.data)
						return null
					}
					console.error('Error:', error)
					return null
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
		signOut: '/auth/login'
	},
	/* jwt: {
		maxAge: 24 * 60 * 60, // 24 hours
		secret: process.env.JWT_SECRET, // Usar una variable de entorno para el secreto
		encode: async ({ secret, token }: JWTEncodeParams) => {
			// const { secret, token } = params
			// const jwtClaims = {
			// 	sub: token?.sub, // ID del usuario
			// 	name: token?.name, // Nombre del usuario
			// 	admin: token?.admin, // Un ejemplo de claim adicional
			// 	iat: Date.now() / 1000,
			// 	exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // Expire en 24 horas
			// }
			// return jwt.sign(jwtClaims, secret as string, { algorithm: 'HS256' })
			return jwt.sign(token ?? '', secret, { algorithm: 'HS256' })
		},
		decode: async ({ secret, token }): Promise<JwtPayload | null> => {
			// if (!secret) {
			// 	throw new Error('JWT secret is undefined')
			// }
			// return jwt.verify(token?.toString() ?? '', secret, { algorithms: ['HS256'] }) as JwtPayload | null 
			return jwt.verify(token ?? '', secret, { algorithms: ['HS256'] }) as JwtPayload | null
		}
	}, */
	callbacks: {
		//custom data user reponse
		jwt({ account, token, profile, user, session }) {
			if (user) {
				const userTemp = user as any
				delete userTemp.accessToken
				delete userTemp.refreshToken
				token.user = userTemp
				profile = user.profile
			}

			// return token
			// Access token has expired, try to update it
			if (account?.expires_at && Date.now() < account?.expires_at) {
				return token
			}
			// TODO: later add refresh token
			return token //refreshAccessToken(token)
		},
		session({ session, token }) {
			//TODO: add type user to session
			session.user = token.user as any
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
