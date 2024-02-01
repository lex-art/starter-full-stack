const isEmptyValue = (value: any): boolean => {
	return value === null || value === undefined || value === ''
}

const isEquivalent = (a: any, b: any): boolean => {
	// Tratar null, undefined y '' como equivalentes
	if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) {
		return true
	}

	// Comparaciones básicas y tipos primitivos
	if (a === b) return true
	if (typeof a !== typeof b) return false

	// Comparaciones de arreglos
	if (Array.isArray(a) && Array.isArray(b)) {
		//if (a.length !== b.length) return false
		for (let i = 0; i < a.length; i++) {
			if (!isEquivalent(a[i], b[i])) return false
		}
		return true
	}

	// Comparaciones de objetos
	if (typeof a === 'object' && typeof b === 'object') {
		const aKeys = Object.keys(a)
		const bKeys = Object.keys(b)
		if (aKeys.length !== bKeys.length) return false
		for (const key of aKeys) {
			if (!isEquivalent(a[key], b[key])) return false
		}
		return true
	}

	// En caso de que no sean ni arreglos ni objetos
	return false
}

const findDifferences = ({
	original,
	current,
	excludeKeys = []
}: {
	original: Record<string, any>
	current: Record<string, any>
	excludeKeys?: string[]
}): Record<string, any> => {
	const changes: Record<string, any> = {}
	Object.keys({ ...original, ...current }).forEach((key) => {
		if (excludeKeys && excludeKeys.includes(key)) return

		if (typeof original[key] === 'object' && typeof current[key] === 'object') {
			const deepChanges = findDifferences({
				original: original[key],
				current: current[key],
				excludeKeys
			})
			if (Object.keys(deepChanges).length > 0) {
				changes[key] = deepChanges
			}
		} else if (!isEquivalent(original[key], current[key])) {
			changes[key] = current[key]
		}
	})
	return changes
}

export { findDifferences, isEmptyValue, isEquivalent }
