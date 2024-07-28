import { roleAccessMap } from './roles'

export function doesRoleHaveAccessToURL({ role, url }: { role: string; url: string }) {
	const accessibleRoutes = roleAccessMap[role] || []
	return accessibleRoutes.some((route) => {
		// Handle the wildcard case (/*) and similar patterns
		if (route.endsWith('/*')) {
			const baseRoute = route.slice(0, -2) // Remove the /* part
			const regexPattern = baseRoute.replace(/\[.*?\]/g, '[^/]+').replace(/\//g, '\\/')
			const regex = new RegExp(`^${regexPattern}(?:\\/.*)?$`)
			return regex.test(url)
		}

		// Handle general patterns and exact matches
		const regexPattern = route.replace(/\[.*?\]/g, '[^/]+').replace(/\//g, '\\/')
		const regex = new RegExp(`^${regexPattern}$`)
		return regex.test(url)
	})
}
