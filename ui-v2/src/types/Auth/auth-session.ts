import { IAuthMethod } from './auth-method'
import { IProfile } from './profile'
import { IUser } from './user'

export interface AuthSession {
	accessToken: string
	refreshToken: string
	user: IUser
	profile: IProfile
	auth: IAuthMethod
	// if you need to handle multi-account, you can add account here
	// linkedAuthMethods: IAuthMethod[]
}
