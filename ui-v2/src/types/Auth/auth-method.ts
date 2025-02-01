import {
	AUTH_METHOD,
	USER_PERMISSION,
	USER_ROLE,
	USER_TYPE
} from '@/lib/emun'

export interface IAuthMethod {
	id: string
	method: AUTH_METHOD
	role: USER_ROLE
	type: USER_TYPE
	permissions?: USER_PERMISSION[]
}
