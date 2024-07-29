import { USER_PERMISSION } from "./enums/user-permission.enum"
import { USER_ROLE } from "./enums/user-role.enum"
import { USER_TYPE } from "./enums/user-type.enum"

export interface ICurrentUser {
	id: string
	email: string
	isSuperAdmin: boolean
	rol: USER_ROLE
	type: USER_TYPE
    permission: USER_PERMISSION[]
	verified: boolean
	firstName: string
	lastName: string
}