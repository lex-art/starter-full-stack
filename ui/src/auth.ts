import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

const auth = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { type: 'text' },
				password: { type: 'password' }
			},
			authorize(credentials) {
				if (credentials?.username === 'admin' && credentials.password === 'admin') {
					return { id: '1', name: 'admin' }
				}

				return null
			}
		})
	],
	pages: {
		signIn: '/',
		signOut: '/auth/login'
	},
	/* jwt: {
		encode({ secret, token }: { secret: string; token: string }) {
			return jwt.sign(token, secret)
		},
		decode({ secret, token }: { secret: string; token: string }) {
			return jwt.verify(token, secret)
		}
	}, */
	callbacks: {},
	secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthOptions

export default auth
