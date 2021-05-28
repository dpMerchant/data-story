export const get = (object, path = '') => {
	const steps = path ? path.split('.') : []
	return steps.reduce((traversed, part) => {
		return traversed[part] ?? null
	}, object)
}