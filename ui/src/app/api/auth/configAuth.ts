import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWTEncodeParams } from 'next-auth/jwt'

const configAuth = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { type: 'text' },
				password: { type: 'password' }
			},
			authorize(credentials) {
				if (credentials?.username === 'admin' && credentials.password === 'admin') {
					return { id: '200', name: 'oscar', role: 'admin' }
				}

				return null
			}
		})
	],
	pages: {
		signIn: '/auth/login',
		signOut: '/auth/login'
	},
	jwt: {
		maxAge: 24 * 60 * 60, // 24 hours
		secret: process.env.JWT_SECRET, // Usar una variable de entorno para el secreto
		encode: async ({ secret, token }: JWTEncodeParams) => {
			/* const { secret, token } = params
			const jwtClaims = {
				sub: token?.sub, // ID del usuario
				name: token?.name, // Nombre del usuario
				admin: token?.admin, // Un ejemplo de claim adicional
				iat: Date.now() / 1000,
				exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // Expire en 24 horas
			}
			return jwt.sign(jwtClaims, secret as string, { algorithm: 'HS256' }) */
			return jwt.sign(token ?? '', secret, { algorithm: 'HS256' })
		},
		decode: async ({ secret, token }): Promise<JwtPayload | null> => {
			/* if (!secret) {
				throw new Error('JWT secret is undefined')
			}
			return jwt.verify(token?.toString() ?? '', secret, { algorithms: ['HS256'] }) as JwtPayload | null */
			return jwt.verify(token ?? '', secret, { algorithms: ['HS256'] }) as JwtPayload | null
		}
	},
	callbacks: {
		//custom data user reponse
		jwt({ account, token, profile, user, session }) {
			if (user) {
				token.user = user
			}
			return token
		},
		session({ session, token }) {
			//TODO: add type user to session
			session.user = token.user as any
			return session
		}
	},
	secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthOptions

export default configAuth
