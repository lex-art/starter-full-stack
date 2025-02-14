type AccessLevel = Record<string, Record<string, Record<string, boolean>>>

export const accessLevel: AccessLevel = {
	admin: {
		projects: { edit: true, remove: false, create: true, view: true },
		ticket: { edit: true, remove: true, create: true, view: true },
		company: { edit: true, remove: false, create: true, view: true }
	},
	developer: {
		projects: { edit: true, remove: false, create: true, view: true },
		ticket: { edit: true, remove: true, create: true, view: true },
		company: { edit: true, remove: false }
	},
	guest: {
		projects: { edit: true, remove: false, create: true, view: true },
		ticket: { edit: true, remove: false, create: true, view: true },
		company: { edit: false, remove: false, create: true, view: true }
	}
}
