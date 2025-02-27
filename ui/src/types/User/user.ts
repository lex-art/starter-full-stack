import {
	USER_PERMISSION,
	USER_ROLE,
	USER_TYPE
} from '@/lib/utilities/emun'

export interface IProfile {
	// ProfileDto properties
	idProfile: string
	firstName: string
	lastName?: string
	birthDate: Date
	phone: string
	address: string
	imgProfile?: string
	countryCode?: string
	countryCallingCode?: string
}

export interface IUser {
	// UserDto properties
	idUser: number
	email: string
	username?: string
	password?: string
	role: USER_ROLE
	type: USER_TYPE
	permissions?: USER_PERMISSION[]
	timeZone?: string
	profile: IProfile
}

export interface IFullUser extends IProfile {
	user: IUser
}
