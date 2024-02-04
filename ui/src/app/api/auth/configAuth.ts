import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

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
					return { id: '1', name: 'admin' }
				}

				return null
			}
		})
	],
	pages: {
		signIn: '/auth/login',
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
