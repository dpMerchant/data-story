export const get = (object: any, path = '') => {
	const steps = path ? path.split('.') : []
	return steps.reduce((traversed, part) => {
		if(typeof traversed !== 'object' || traversed === null) return null
		return traversed[part] ?? null
	}, object)
}