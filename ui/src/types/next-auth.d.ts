// next-auth.d.ts
import 'next-auth'
import { IProfile, IUser } from './User'

declare module 'next-auth' {
	interface User extends IUser {
		accessToken?: string
		refreshToken?: string
	}
	interface Session {
		user: User | null
		accessToken?: string | null
		refreshToken?: string | null
		expires?: string | null
	}
	interface Profile extends IProfile {}
	interface Session {
		user: IUser | null
	}
}
