export type RoleAccess = Record<string, Array<string>>

export const roleAccessMap: RoleAccess = {
	admin: ['/', '*'],
	user: ['/', '/components', '/user/[id]'],
	guest: ['/*', '/elements/*']
	// add more roles and their accessible routes here
}
