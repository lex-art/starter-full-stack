'use server'
import { cookies, headers } from 'next/headers'
import { accessLevel } from '../accessControl/accessLevel'

// It's optional to define page and role here
const userPermission = (page?: string, role?: string) => {
	const header = headers()
	const cookieStore = cookies()
	const currentPath = header.get('x-url') || ''

	/* if (session.status === 'loading' || session.status === 'unauthenticated') return {} */

	if (!role) {
		role = cookieStore.get('role')?.value ?? 'guest'
	}

	if (!page) page = currentPath.split('/').pop()

	const accessLevels = role && page ? accessLevel[role]?.[page] : {}

	return {
		editLevel: accessLevels?.edit,
		removeLevel: accessLevels?.remove,
		createLevel: accessLevels?.create,
		viewLevel: accessLevels?.view
	}
}

export default userPermission
