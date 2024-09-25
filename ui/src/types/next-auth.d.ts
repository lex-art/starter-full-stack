// next-auth.d.ts
import 'next-auth'
import { IProfile, IUser } from './User'

declare module 'next-auth' {
	interface User extends IUser {}
	interface Profile extends IProfile {}
	interface Session {
		user: IUser
	}
}
