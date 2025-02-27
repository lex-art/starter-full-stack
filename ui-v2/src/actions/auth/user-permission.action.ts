'use server'
import { accessLevel } from '@/lib/access-control/access-control'
import { cookies, headers } from 'next/headers'

// It's optional to define page and role here
const userPermission = async (page?: string, role?: string) => {
	const header = await headers()
	const cookieStore = await cookies()
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
